/*const {validationResult} = require('express-validator');
const Product = require('../entities/Product');


expose.create = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
    }
}*/