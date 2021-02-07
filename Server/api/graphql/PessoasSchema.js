const bcrypt = require('bcryptjs');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLInputObjectType,
} = require('graphql');

const uuid = require('uuid/v4');
const Pessoa = require('../model/Pessoa');
const Estado = require('../model/Estado');
const Cidade = require('../model/Cidade');
const ContactoModel = require('../model/Contacto');
const DocumentoModel = require('../model/Documento');
const ContaUsuario = require('../model/ContaUsuario');
const PessoaContacto = require('../model/PessoaContacto');
const PessoaDocumento = require('../model/PessoaDocumento');
const PessoaIdioma = require('../model/PessoaIdioma');

const { EstadoType } = require('./EstadoSchema');
const { CidadeType } = require('./CidadesSchema');
const { ContactoType, ContactoInput } = require('./ContactosSchema');
const { DocumentoType, DocumentoInput } = require('./DocumentosSchema');
const { PessoaContactoType } = require('./PessoaContactoSchema');
const { PessoaIdiomaType } = require('./PessoaIdiomaSchema ');

const { CodeGenerator, isEmpty } = require('../../helpers');

const PessoaType = new GraphQLObjectType({
    name: 'PessoaObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Nome: { type: GraphQLString },
        SobreNome: { type: GraphQLString },
        Morada: { type: GraphQLString },
        DataNascimento: { type: GraphQLString },
        Status: { type: GraphQLInt },
        // DocumentoId: { type: GraphQLString },
        // Documento: {
        //     type: DocumentoType,
        //     resolve(prev, args) {
        //         return Documento.findOne({
        //                 where: { Id: prev.DocumentoId },
        //             })
        //             .then((e) => e)
        //             .catch((error) => error);
        //     },
        // },
        // ContactoId: { type: GraphQLString },
        PessoaContacto: {
            type: new GraphQLList(PessoaContactoType),
            resolve(prev, args) {
                return PessoaContacto.findAll({
                        where: { PessoaId: prev.Id },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        PessoaIdiomas: {
            type: new GraphQLList(PessoaIdiomaType),
            resolve(prev, args) {
                return PessoaIdioma.findAll({
                        where: { PessoaId: prev.Id },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
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

const PessoaInput = new GraphQLInputObjectType({
    name: 'PessoaInput',
    fields: () => ({
        Id: { type: GraphQLString },
        Nome: { type: GraphQLString },
        SobreNome: { type: GraphQLString },
        Email: { type: GraphQLString },
        Has_PassWord: { type: GraphQLString },
        DataNascimento: { type: GraphQLString },
        Localizacao: { type: GraphQLString },
        Foto: { type: GraphQLString },
        Status: { type: GraphQLInt },
        Provider: { type: GraphQLInt },
        DocumentoId: { type: GraphQLString },
        Documento: { type: new GraphQLList(DocumentoInput) },
        ContactoId: { type: GraphQLString },
        Contacto: { type: new GraphQLList(ContactoInput) },
        CidadeId: { type: GraphQLString },
        EstadoId: { type: GraphQLString },
    }),
});

const PessoaPayLoad = new GraphQLObjectType({
    name: 'PessoaPayLoad',
    fields: () => ({
        addPessoa: {
            type: new GraphQLList(PessoaType),
        },
    }),
});

const PessoaResolve = {
    Pessoas: {
        type: new GraphQLList(PessoaType),
        resolve(parent, args) {
            return Pessoa.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Pessoa: {
        type: new GraphQLList(PessoaType),
        args: { Id: { type: GraphQLString }, Consts: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args);
            return Pessoa.findAll({
                    where: {
                        [args.Consts]: args.Id,
                    },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

const PessoaMutation = {
    addPessoa: {
        type: PessoaType,
        args: {
            input: {
                type: PessoaInput,
            },
        },
        async resolve(_, { input }) {
            const sequelize = require('../database/dbSetting');
            const t = await sequelize.transaction();

            try {
                let {
                    Documento,
                    Contacto,
                    PassWord,
                    Has_PassWord,
                    Nome,
                    SobreNome,
                    Email,
                    UserName,
                    Provider,
                } = input,
                ContactoId,
                DocumentoId;

                delete input.Email;
                delete input.Contacto;
                delete input.Documento;
                delete input.Has_PassWord;
                console.log(Provider);
                /**
                 * Check user
                 */
                if (isEmpty(UserName)) UserName = `${Nome}${SobreNome}`;

                let userExist = await ContaUsuario.findOne({
                    where: { Email: Email },
                });

                if (userExist) throw new Error('E-mail já existe, verifique....');

                if (Has_PassWord) PassWord = await passWord_Hash(Has_PassWord);

                if (!!Contacto)
                    ContactoId = await addContactos(Contacto, { transaction: t });

                if (!!Documento)
                    DocumentoId = await addDocumentos(Documento, { transaction: t });

                const sysdate = new Date(Date.now());

                const pessoa = await Pessoa.create({
                    Id: uuid(),
                    ...input,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                }, { transaction: t });

                const { dataValues: pessoaValues } = pessoa;

                if (isEmpty(pessoaValues))
                    throw Error('Ocorreu algum erro ao Criar uma Pessoa');

                const { Id: PessoaId } = pessoaValues;

                if (DocumentoId) await addDocumentoPessoa([{ PessoaId, DocumentoId }]);

                if (ContactoId) await addContactoPessoa([{ PessoaId, ContactoId }]);

                if (Provider !== 0) Provider = 1;

                if (isEmpty(PassWord)) PassWord = await passWord_Hash(CodeGenerator());

                await addUser({
                    Provider,
                    Email,
                    UserName,
                    PassWord,
                    PessoaId,
                }, { transaction: t });

                await t.commit();
                return pessoaValues;
            } catch (error) {
                await t.rollback();
                throw new Error(error.message);
            }
        },
    },

    // updatePessoa: {
    //     type: PessoaType,
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

/** Funções Auxiliares*/

const addDocumentos = async(data = [], transaction) => {
    const docExist = await DocumentoModel.findOne({
            where: { NumDocumento: data[0].NumDocumento },
        },
        transaction
    );

    if (docExist) throw Error('Número de documento já existe, verifica...');

    const osysdate = new Date(Date.now());

    const result = await DocumentoModel.create({
            Id: uuid(),
            ...data[0],
            CreatedAt: osysdate,
            UpdatedAt: osysdate,
        },
        transaction
    );

    if (isEmpty(result.dataValues))
        throw Error('Ocorreu algum erro ao Criar um Documento');

    return result.dataValues.Id;
};

const addContactos = async(data = [], transaction) => {
    const contactExist = await ContactoModel.findOne({
            where: { Email: data[0].Email },
        },
        transaction
    );

    if (contactExist) throw Error('Contacto já existe, tenta outro...');

    const osysdate = new Date(Date.now());

    await ContactoModel.create({
            Id: uuid(),
            ...data[0],
            CreatedAt: osysdate,
            UpdatedAt: osysdate,
        },
        transaction
    );

    if (isEmpty(result.dataValues))
        throw Error('Ocorreu algum erro ao Criar um contacto');

    return result.dataValues.Id;
};

const addContactoPessoa = async(data = [], transaction) => {
    const osysdate = new Date(Date.now());

    data.forEach(async function(contPessoa) {
        const result = await PessoaContacto.create({
                Id: uuid(),
                ...contPessoa,
                CreatedAt: osysdate,
                UpdatedAt: osysdate,
            },
            transaction
        );
        if (isEmpty(result.dataValues))
            throw Error('Ocorreu algum erro no Contacto da Pessoa');
    });
};

const addDocumentoPessoa = async(data = [], transaction) => {
    const osysdate = new Date(Date.now());

    data.forEach(async function(docPessoa) {
        try {
            if (typeof docPessoa.DocumentoId !== 'string')
                throw Error('DocumentoId must be a string');

            const result = await PessoaDocumento.create({
                    Id: uuid(),
                    ...docPessoa,
                    CreatedAt: osysdate,
                    UpdatedAt: osysdate,
                },
                transaction
            );

            if (isEmpty(result.dataValues))
                throw Error('Ocorreu algum erro no Documento da Pessoa');
        } catch (error) {}
    });
};

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

const passWord_Hash = async(value) => await bcrypt.hash(value, 8);

module.exports = { PessoaResolve, PessoaType, PessoaMutation };