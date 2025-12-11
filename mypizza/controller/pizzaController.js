// On ne veut importer QUE ce dont on a besoin, sans express-validator
var Pizza = require('../entities/Pizza.js');
var validationResult = require('express-validator').validationResult;;

// GET ALL (C'est la seule fonction dont on a besoin pour l'instant)
exports.findAll = async (req, res, next) => {
    try {
        const pizzas = await Pizza.findAll();
        // S'assurer qu'on reçoit un tableau vide si aucune pizza n'est trouvée
        if (!pizzas || pizzas.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(pizzas);
    } catch (err) {
        // En cas d'erreur de base de données (si les tables ne sont pas remplies)
        console.error("Erreur lors de la récupération des pizzas :", err);
        next(err);
    }
};

// GET ONE
exports.findOne = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const pizza = await Pizza.findById(id);
        if (!pizza) return res.status(404).json({ error: 'Pizza not found' });

        res.status(200).json(pizza);
    } catch (err) {
        next(err);
    }
};

// GET INGREDIENTS
exports.findIngredients = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const pizza = await Pizza.findIngredients(id);
        if (!pizza) return res.status(404).json({ error: 'Pizza not found' });

        res.status(200).json(pizza);
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

        const created = await Pizza.create(req.body);
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

        const updated = await Pizza.update(id, req.body);
        if (!updated) return res.status(404).json({ error: 'Pizza not found' });

        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE
exports.remove = async (req, res, next) => { // J'ai renommé 'delete' en 'remove' car delete est un mot réservé parfois
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        res.status(200).json({
            message: `La pizza ${id} a bien été supprimé`,
            deleteId: id
        })

        const deletedCount = await Pizza.delete(id);
        if (deletedCount === 0) return res.status(404).json({ error: 'Pizza not found' });

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

    exports.findDailyPizza= async (req, res, next) => {
    try {
        var pizza = await Pizza.findDailyPizza();
        // S'assurer qu'on reçoit un tableau vide si aucune pizza n'est trouvée
        if (!pizza) {
            return res.status(404).json({error: 'No daily pizza found'});
        }
        res.status(200).json(pizza);
    } catch (err) {
        // En cas d'erreur de base de données (si les tables ne sont pas remplies)
        console.error("Erreur lors de la récupération des pizzas :", err);
        next(err);
    }
};