var express = require('express');
var { body, param } = require('express-validator');
var ingredientsController = require('../controller/ingredientsController.js');

var router = express.Router();

/**
 * Validation rules
 */
var createAndUpdateValidations = [
    body('name').isString().notEmpty().withMessage('name is required')
];

// Routes
router.get('/', ingredientsController.findAll);
router.get('/:id', ingredientsController.findOne);

router.post('/', createAndUpdateValidations, ingredientsController.create);

module.exports = router;
