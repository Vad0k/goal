const express = require('express');
const controller = require('../controllers/goal');
const router = new express.Router();

var admin = require('firebase-admin');




router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.remove);
router.post('/', controller.create);
router.patch('/:id', controller.update);

module.exports = router;