require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./api/database/dbSetting');
const API = '/api/';
var app = express();
const cors = require('cors');
app.use(cors({ origin: true, credentials: true }));
/**
 * Routes
 */
var indexRouter = require('./api/routes/index');
var estadoRouter = require('./api/routes/estado');
var avaliacaoCurriculosRouter = require('./api/routes/avaliacaoCurriculo');
var beneficiosRouter = require('./api/routes/beneficio');
var candidatosRouter = require('./api/routes/candidato');
var candidaturasRouter = require('./api/routes/candidatura');
var cargosRouter = require('./api/routes/cargo');
var cidadesRouter = require('./api/routes/cidade');
var contactosRouter = require('./api/routes/contacto');
var contaUsuariosRouter = require('./api/routes/contaUsuario');
var curriculoDetalhesRouter = require('./api/routes/curriculoDetalhe');
var curriculoHobesRouter = require('./api/routes/curriculoHobes');
var curriculosRouter = require('./api/routes/curriculo');
var detalhesRouter = require('./api/routes/detalhe');
var documentosRouter = require('./api/routes/documento');
var empregadorsRouter = require('./api/routes/empregador');
var empresasRouter = require('./api/routes/empresa');
var hobesRouter = require('./api/routes/hobes');
var oportunidadesRouter = require('./api/routes/oportunidade');
var pessoasRouter = require('./api/routes/pessoa');
var sectorDeAtividadesRouter = require('./api/routes/sectorDeAtividade');
var tipoDetalhesRouter = require('./api/routes/tipoDetalhe');
var tipoDocumentosRouter = require('./api/routes/tipoDocumento');

//Allow cross - Origin

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
const graphqlHTTP = require('express-graphql');
const schema = require('./api/graphql/schema');
/**
 * APIs
 */

app.use(`${API}estados`, estadoRouter);
app.use(`${API}avaliacaoCurriculos`, avaliacaoCurriculosRouter);
app.use(`${API}beneficios`, beneficiosRouter);
app.use(`${API}candidatos`, candidatosRouter);
app.use(`${API}candidaturas`, candidaturasRouter);
app.use(`${API}cargos`, cargosRouter);
app.use(`${API}cidades`, cidadesRouter);
app.use(`${API}contactos`, contactosRouter);
app.use(`${API}contaUsuarios`, contaUsuariosRouter);
app.use(`${API}curriculoDetalhes`, curriculoDetalhesRouter);
app.use(`${API}curriculoHobes`, curriculoHobesRouter);
app.use(`${API}curriculos`, curriculosRouter);
app.use(`${API}detalhes`, detalhesRouter);
app.use(`${API}documentos`, documentosRouter);
app.use(`${API}empregadors`, empregadorsRouter);
app.use(`${API}empresas`, empresasRouter);
app.use(`${API}hobes`, hobesRouter);
app.use(`${API}oportunidades`, oportunidadesRouter);
app.use(`${API}pessoas`, pessoasRouter);
app.use(`${API}sectorDeAtividades`, sectorDeAtividadesRouter);
app.use(`${API}tipoDetalhes`, tipoDetalhesRouter);
app.use(`${API}tipoDocumentos`, tipoDocumentosRouter);

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

/**
 * Authentication with DB
 */
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// const typeDefs = gql `
//     type Query {
//         products: [Product]
//         product(id: Int!): Product
//     }
//     type Product {
//         id: Int,
//         name: String,
//         description: String
//     }
//     input ProductInput {
//         name: String,
//         description: String
//     }
//     type Mutation {
//         login(email: String): String # token
//         createProduct(product: ProductInput)
//     }
// `
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;