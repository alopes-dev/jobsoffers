const bcrypt = require('bcryptjs');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require('graphql');

const User = require('../model/ContaUsuario');

const SettionType = new GraphQLObjectType({
  name: 'SettionList',
  fields: () => ({
    Provider: { type: GraphQLInt },
    Token: { type: GraphQLString },
    Email: { type: GraphQLString },
    UserName: { type: GraphQLString },
    PassWord: { type: GraphQLString },
    PessoaId: { type: GraphQLString },
    EmpresaId: { type: GraphQLString },
  }),
});

const SettionInput = new GraphQLInputObjectType({
  name: 'SettionInput',
  fields: () => ({
    UserName: { type: GraphQLString },
    PassWord: { type: GraphQLString },
    Provider: { type: GraphQLInt },
  }),
});

const SettionMutation = {
  addSettion: {
    type: SettionType,
    args: {
      input: {
        type: new GraphQLNonNull(SettionInput),
      },
    },
    async resolve(_, { input }) {
      try {
        console.log(input);
        const { PassWord, UserName, Provider } = input;

        const userExist = await User.findOne({ where: { UserName } });

        if (!userExist) throw new Error('Usuario não encontrado...');

        const { dataValues: user } = userExist;

        if (user.Provider !== Provider)
          throw new Error('O seu usuario não tem accesso a está plataforma!!');

        if (!(await bcrypt.compare(PassWord, user.PassWord)))
          throw new Error('Senha não corresponde...');

        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = {
  SettionMutation,
};
