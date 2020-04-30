var express = require('express');
var router = express.Router();
const uuid = require('uuid/v4')
const Competencia = require('../model/Competencia')
const { isEmpty } = require('../../helpers')
    /**
     * Connect the app to the right DataBase correspondent to the shopping/Organization
     * @param {Object} metaDados - An object containing following keys (instanceName, instancePassword, host, dataBaseName)

    */
    /**
     * Define all relationships got by this Model
     * @param {Sequelize} lojaDB - The connection setted to this shopping/organization
     */
function setRelationships(lojaDB) {

    //Begin definiton of relationship


    //End definiton of relationship
}


exports.getOne = (req, res, next) => {

    Competencia.findOne({
        where: { Id: req.params.id, Status: true },
        include: [{
            all: true,
            attributes: { exclude: ['CreatedAt', 'UpdatedAt', 'Status'] }
        }]
    }).then(x => {
        isEmpty(x) ?
            res.status(404).send({ result: x, success: true }) :
            res.send(x);
    }).catch(next)

};



exports.getAll = (req, res, next) => {

    Competencia.findAll()
        .then(e => {
            res.send(e);
        }).catch(next)
};


exports.insert = (req, res, next) => {
    let data = new Date(Date.now())
        // assign values
    const CompetenciaId = uuid()
    const sysdate = new Date(Date.now())

    Competencia.create({
        Id: CompetenciaId,
        Designacao: req.body.designacao,

        CreatedAt: sysdate,
        UpdatedAt: sysdate,
        Status: true
    }).then(() => {
        res.status(201).send({ msg: 'Created Successfuly' })
    }).catch(next)

};

exports.update = (req, res, next) => {

    req.body.UpdatedAt = new Date().toJSON()
    Competencia.update(req.body, { where: { Id: req.params.id } }).then(() => {
        res.status(201).send({ msg: 'Updated Successfuly' })
    }).catch(next)

};


exports.delete = (req, res, next) => {

    Competencia.destroy(req.params.id).then(() => {
        res.status(200).send({ msg: 'Deleted Successfuly' })
    }).catch(next)

};