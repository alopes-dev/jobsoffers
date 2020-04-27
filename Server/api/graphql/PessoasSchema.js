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
const Contacto = require('../model/Contacto');
const Documento = require('../model/Documento');
const ContaUsuario = require('../model/ContaUsuario');
const PessoaContacto = require('../model/PessoaContacto');
const PessoaDocumento = require('../model/PessoaDocumento');

const { EstadoType } = require('./EstadoSchema');
const { CidadeType } = require('./CidadesSchema');
const { ContactoType, ContactoInput } = require('./ContactosSchema');
const { DocumentoType, DocumentoInput } = require('./DocumentosSchema');

const { CodeGenerator, isEmpty } = require('../../helpers');

const PessoaType = new GraphQLObjectType({
    name: 'PessoaObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Nome: { type: GraphQLString },
        SobreNome: { type: GraphQLString },
        DataNascimento: { type: GraphQLString },
        Localizacao: { type: GraphQLString },
        Foto: { type: GraphQLString },
        Status: { type: GraphQLInt },
        DocumentoId: { type: GraphQLString },
        Documento: {
            type: DocumentoType,
            resolve(prev, args) {
                return Documento.findOne({
                        where: { Id: prev.DocumentoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        ContactoId: { type: GraphQLString },
        Contacto: {
            type: ContactoType,
            resolve(prev, args) {
                return Contacto.findOne({
                        where: { Id: prev.ContactoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        CidadeId: { type: GraphQLString },
        Cidade: {
            type: CidadeType,
            resolve(prev, args) {
                return Cidade.findOne({
                        where: { Id: prev.CidadeId },
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
        DataNascimento: { type: GraphQLString },
        Localizacao: { type: GraphQLString },
        Foto: { type: GraphQLString },
        Status: { type: GraphQLInt },
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
        type: PessoaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args);
            return Pessoa.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

const PessoaMutation = {
    pessoaInput: {
        type: PessoaPayLoad,
        args: {
            input: {
                type: PessoaInput,
            },
        },
        async resolve(parent, { input }) {
            let { Documento, Contacto, PassWord, UserName, Role, EstadoId } = input,
            ContactoId,
            DocumentoId;

            delete input.Contacto;
            delete input.Documento;

            if (!!Contacto) ContactoId = await addContactos(Contacto);

            if (!!Documento) DocumentoId = await addDocumentos(Documento);

            const sysdate = new Date(Date.now());

            const data = await Pessoa.create({
                    Id: uuid(),
                    ...input,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                })
                .then((e) => e)
                .catch((err) => err);

            if (isEmpty(data.dataValues)) return null;

            const { Id: PessoaId, Nome, SobreNome } = data.dataValues;

            let contactoPessoaId = await addContactoPessoa([
                { PessoaId, ContactoId },
            ]);

            let documentoPessoaId = await addDocumentoPessoa([
                { PessoaId, DocumentoId },
            ]);

            if (isEmpty(Role)) Role = 'CLIENT';

            if (isEmpty(UserName)) UserName = `${Nome}${SobreNome}`;

            if (isEmpty(PassWord)) PassWord = CodeGenerator();

            let isOk = await addUser({
                Role,
                EstadoId,
                UserName,
                PassWord,
                PessoaId,
            });

            values = [
                documentoPessoaId,
                contactoPessoaId,
                PessoaId,
                DocumentoId,
                ContactoId,
            ];

            if (isEmpty(isOk)) goRollBack(values); // Make a RollBack when something goes wrong

            return data.dataValues;
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

const addDocumentos = async(data = []) => {
    if (isEmpty(data)) return null;

    osysdate = new Date(Date.now());
    result = await Documento.create({
        Id: uuid(),
        ...data[0],
        CreatedAt: osysdate,
        UpdatedAt: osysdate,
    });

    if (isEmpty(result.dataValues)) return null;

    return result.dataValues.Id;
};

const addContactos = async(data = []) => {
    if (isEmpty(data)) return null;

    osysdate = new Date(Date.now());
    result = await Contacto.create({
        Id: uuid(),
        ...data[0],
        CreatedAt: osysdate,
        UpdatedAt: osysdate,
    });

    if (isEmpty(result.dataValues)) return null;

    return result.dataValues.Id;
};

const addContactoPessoa = async(data = []) => {
    let result = [];
    if (isEmpty(data)) return null;

    osysdate = new Date(Date.now());

    data.forEach(async function(contPessoa) {
        result = await PessoaContacto.create({
            Id: uuid(),
            ...contPessoa,
            CreatedAt: osysdate,
            UpdatedAt: osysdate,
        });
    });

    if (isEmpty(result.dataValues)) return null;

    return result.dataValues.Id;
};

const addDocumentoPessoa = (data = []) => {
    let result = [];
    if (isEmpty(data)) return null;

    osysdate = new Date(Date.now());

    data.forEach(async function(docPessoa) {
        result = await PessoaDocumento.create({
            Id: uuid(),
            ...docPessoa,
            CreatedAt: osysdate,
            UpdatedAt: osysdate,
        });
    });

    if (isEmpty(result.dataValues)) return null;

    return result.dataValues.Id;
};

const addUser = async(data) => {
    if (isEmpty(data)) return null;

    osysdate = new Date(Date.now());
    result = await ContaUsuario.create({
        Id: uuid(),
        ...data,
        CreatedAt: osysdate,
        UpdatedAt: osysdate,
    });

    if (isEmpty(result.dataValues)) return null;

    return result.dataValues;
};

const goRollBack = (values = []) => {
    console.log(values);
};

module.exports = { PessoaResolve, PessoaType, PessoaMutation };