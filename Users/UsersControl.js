const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');

const proceservice = require('./UserServes');
require('dotenv').config()
const { isAuth } = require('../utils');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.post('/updatuser/', update);
router.post('/deletuser/', _delete);
router.post('/login', login);
router.post('/savetoken', savetoken);
router.get('/gettoken/user', gettoken);


module.exports = router;




function gettoken(req, res, next) {
   
    proceservice.gettoken()
        .then(users=> res.json(users))
        .catch(next);
}


function getAll(req, res, next) {
    proceservice.getAll()
        .then(users=> res.json(users))
        .catch(next);
}

function login(req, res, next) {
    proceservice.login(req.body)
        .then(users=> res.json(users))
        .catch(next);
}
function getById(req, res, next) {
    proceservice.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    proceservice.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}
function savetoken(req, res, next) {
    proceservice.savetoken(req.body)
        .then(() => res.json({ message: 'token updated' }))
        .catch(next);
}

function update(req, res, next) {
    proceservice.update(req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    proceservice.delete(req.body)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

