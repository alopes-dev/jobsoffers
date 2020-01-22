var express = require('express');
var router = express.Router();
const uuid = require('uuid/v4')
const Estado = require('../model/Estado')
const { isEmpty } = require('../../helpers')
    /**
     * Connect the app to the right DataBase correspondent to the shopping/Organization
     * @param {Object} metaDados - An object containing following keys (instanceName, instancePassword, host, dataBaseName)

    */



exports.getOne = (req, res, next) => {

    Estado.findOne({
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

    Estado.findAll()
        .then(e => {
            res.send(e);
        }).catch(next)
};


exports.insert = (req, res, next) => {
    let data = new Date(Date.now())
        // assign values
    const estadoId = uuid()
    const sysdate = new Date(Date.now())
    console.log(req.body)
    Estado.create({
        Id: estadoId,
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
    Estado.update(req.body, { where: { Id: req.params.id } }).then(() => {
        res.status(201).send({ msg: 'Updated Successfuly' })
    }).catch(next)

};


exports.delete = (req, res, next) => {

    Estado.destroy(req.params.id).then(() => {
        res.status(200).send({ msg: 'Deleted Successfuly' })
    }).catch(next)

};