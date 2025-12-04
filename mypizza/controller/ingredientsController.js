var Ingredients = require('../entities/Ingredients.js');
var { validationResult } = require('express-validator');

// GET ALL
exports.findAll = async (req, res, next) => {
    try {
        const ingredients = await Ingredients.findAll();
        if (!ingredients || ingredients.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(ingredients);
    } catch (err) {
        console.error("Erreur lors de la récupération des ingrédients :", err);
        next(err);
    }
};

// GET ONE
exports.findOne = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const ingredient = await Ingredients.findById(id);
        if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });

        res.status(200).json(ingredient);
    } catch (err) {
        next(err);
    }
};

// CREATE
exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const created = await Ingredients.create(req.body);
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

// UPDATE
exports.update = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const updated = await Ingredients.update(id, req.body);
        if (!updated) return res.status(404).json({ error: 'Ingredient not found' });

        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE
exports.remove = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const deletedCount = await Ingredients.delete(id);
        if (deletedCount === 0) return res.status(404).json({ error: 'Ingredient not found' });

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
