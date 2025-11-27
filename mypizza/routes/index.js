import express from 'express';
// Assure-toi que le chemin vers ton contrôleur est bon
import { findAll } from '../controller/pizzaController.js';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.send("API Pizzayolo en ligne ! Va sur /pizzas pour voir le menu.");
});

/* GET la liste des pizzas */
// C'est ici qu'on relie l'URL '/pizzas' à ta fonction findAll
router.get('/pizzas', findAll);

export default router;