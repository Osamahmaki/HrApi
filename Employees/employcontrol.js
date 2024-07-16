const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');

const employservice = require('./employservice');

// routes

router.get('/', getAll);
router.get('/get/:id', getAllby);
router.get('/:id', getById);
router.post('/', create);
router.post('/updateemploy/', update);
router.post('/deleteemploy/', _delete);
router.get('/gets/section', Getsection);
router.get('/getd/division', Getdivision);
router.get('/get/getmaxnumberempl', GetMaxNumberEmpl);
router.post('/addsection/', addsection);
router.post('/adddivision/', addDivision);
router.get('/getd/division/:id', GetdivisionbyidSection);



module.exports = router;

// route functions



function getAll(req, res, next) {
    employservice.getAll()
        .then(result=> res.json(result))
        .catch(next);
}




function GetdivisionbyidSection(req, res, next) {
    employservice.GetdivisionbyidSection(req.params.id)
        .then(result=> res.json(result))
        .catch(next);
}


function getAllby(req, res, next) {
    employservice.getAllby(req.params.id)
        .then(result=> res.json(result))
        .catch(next);
}

function getById(req, res, next) {
    employservice.getById(req.params.id)
        .then(result => res.json(result))
        .catch(next);
}



function GetMaxNumberEmpl(req, res, next) {
    employservice.GetMaxNumberEmpl()
        .then(result=> res.json(result))
        .catch(next);
}

function Getdivision(req, res, next) {
    employservice.getdivision()
        .then(result=> res.json(result))
        .catch(next);
}


function Getsection(req, res, next) {
    employservice.getsection()
        .then(result=> res.json(result))
        .catch(next);
}


function create(req, res, next) {
    employservice.create(req.body)
        .then(() => res.json({ message: 'employ created' }))
        .catch(next);
}

function update(req, res, next) {
    employservice.update(req.body)
        .then(() => res.json({ message: 'employ updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    employservice.delete(req.body)
        .then(() => res.json({ message: 'employ deleted' }))
        .catch(next);
}



function addsection(req, res, next) {
    employservice.addsection(req.body)
        .then(() => res.json({ message: 'section created' }))
        .catch(next);
}


function addDivision(req, res, next) {
    employservice.addDivision(req.body)
        .then(() => res.json({ message: 'Division created' }))
        .catch(next);
}