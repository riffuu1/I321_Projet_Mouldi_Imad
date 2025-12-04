var express =require( 'express');
var path=require( 'path');
var cookieParser =require ('cookie-parser');
var logger =require( 'morgan');

// Import des routes (Assure-toi que ces fichiers existent ou commente-les si besoin)
// Note: Si tes fichiers routes utilisent encore "require", ça plantera après.
// Pour l'instant, on importe juste express.
var pizzaRouter=require( './routes/pizza.js');
var ingredientsRouter=require( './routes/ingredients.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/pizzas', pizzaRouter);
app.use('/ingredients', ingredientsRouter);

// ---------------------------------------------------------
// DÉMARRAGE DU SERVEUR (Ajouté car tu lances via node app.js)
// ---------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});

module.exports = app;