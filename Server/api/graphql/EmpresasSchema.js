const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
} = require('graphql');

const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const Empresa = require('../model/Empresa');
const Estado = require('../model/Estado');
const ContaUsuario = require('../model/ContaUsuario');

const { EstadoType } = require('./EstadoSchema');
const { isEmpty, CodeGenerator } = require('../../helpers');

const EmpresaType = new GraphQLObjectType({
    name: 'EmpresaObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Nif: { type: GraphQLString },
        RazaoSocial: { type: GraphQLString },
        Missao: { type: GraphQLString },
        Visao: { type: GraphQLString },
        SectorDeAtividade: { type: GraphQLString },
        Telefone: { type: GraphQLString },
        // Rua: {
        //   type: EstadoType,
        //   resolve(prev, args) {
        //     return Estado.findOne({
        //       where: { Id: prev.EstadoId },
        //     })
        //       .then((e) => e)
        //       .catch((error) => error);
        //   },
        // },
        EstadoId: { type: GraphQLString },
        Estado: {
            type: EstadoType,
            resolve(prev, args) {
                return Estado.findOne({
                        where: { Id: prev.EstadoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const EmpresaResolve = {
    Empresas: {
        type: new GraphQLList(EmpresaType),
        resolve(parent, args) {
            return Empresa.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Empresa: {
        type: EmpresaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args);
            return Empresa.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

const EmpresaInput = new GraphQLInputObjectType({
    name: 'EmpresaInput',
    fields: () => ({
        Id: { type: GraphQLString },
        Email: { type: GraphQLString },
        Has_PassWord: { type: GraphQLString },
        // Foto: { type: GraphQLString },
        UserName: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        DataCriacao: { type: GraphQLString },
        Nif: { type: GraphQLString },
        RazaoSocial: { type: GraphQLString },
        Missao: { type: GraphQLString },
        Visao: { type: GraphQLString },
        SectorDeAtividade: { type: GraphQLString },
        Telefone: { type: GraphQLString },
        EstadoId: { type: GraphQLString },
    }),
});

const EmpresaMutation = {
    addEmpresa: {
        type: EmpresaType,
        args: {
            input: {
                type: EmpresaInput,
            },
        },
        async resolve(_, { input }) {
            const sequelize = require('../database/dbSetting');
            const t = await sequelize.transaction();

            try {
                let { Email, Has_PassWord, Provider, UserName } = input;
                delete input.Email;
                delete input.Has_PassWord;
                delete input.UserName;
                /**
                 * Check user
                 */

                console.log(input);

                let userExist = await ContaUsuario.findOne({
                    where: { Email: Email },
                });

                if (userExist) throw new Error('E-mail já existe, verifique....');

                if (Has_PassWord) PassWord = await passWord_Hash(Has_PassWord);

                const sysdate = new Date(Date.now());

                const empresa = await Empresa.create({
                    Id: uuid(),
                    ...input,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                }, { transaction: t });

                const { dataValues: EmpresaValues } = empresa;

                if (isEmpty(EmpresaValues))
                    throw Error('Ocorreu algum erro ao Criar uma Empresa');

                const { Id: EmpresaId } = EmpresaValues;

                if (isEmpty(Provider)) Provider = 1;

                if (isEmpty(PassWord)) PassWord = await passWord_Hash(CodeGenerator());

                await addUser({
                    Provider,
                    Email,
                    UserName,
                    PassWord,
                    EmpresaId,
                }, { transaction: t });

                await t.commit();
                return EmpresaValues;
            } catch (error) {
                await t.rollback();
                throw new Error(error.message);
            }
        },
    },

    // updateEmpresa: {
    //     type: EmpresaType,
    //     args: {
    //         Id: { type: new GraphQLNonNull(GraphQLString) },
    //         Designacao: { type: new GraphQLNonNull(GraphQLString) },
    //     },
    //     resolve(parent, args) {
    //         return Estado.update({
    //                 Designacao: args.Designacao,
    //                 UpdatedAt: new Date().toJSON(),
    //             }, { where: { Id: args.Id } })
    //             .then((e) => args)
    //             .catch((err) => err);
    //     },
    // },
    // deleteEstado: {
    //     type: EstadoType,
    //     args: {
    //         Id: { type: new GraphQLNonNull(GraphQLString) },
    //     },
    //     resolve(parent, args) {
    //         return Estado.destroy({ where: { Id: args.Id } })
    //             .then((e) => e)
    //             .catch((err) => err);
    //     },
    // },
};

const passWord_Hash = async(value) => await bcrypt.hash(value, 8);

const addUser = async(data, transaction) => {
    const osysdate = new Date(Date.now());

    const result = await ContaUsuario.create({
            Id: uuid(),
            ...data,
            CreatedAt: osysdate,
            UpdatedAt: osysdate,
        },
        transaction
    );

    if (isEmpty(result.dataValues))
        throw Error('Ocorreu algum erro ao Cadastrar um usuario');
};

module.exports = { EmpresaResolve, EmpresaType, EmpresaMutation };