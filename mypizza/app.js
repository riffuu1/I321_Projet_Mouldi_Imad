import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';

// Pour gérer les chemins de fichiers en mode module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import des routes (Assure-toi que ces fichiers existent ou commente-les si besoin)
// Note: Si tes fichiers routes utilisent encore "require", ça plantera après.
// Pour l'instant, on importe juste express.
import indexRouter from './routes/index.js';
import productRouter from './routes/product.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pizzas', productRouter);

// ---------------------------------------------------------
// DÉMARRAGE DU SERVEUR (Ajouté car tu lances via node app.js)
// ---------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});

export default app;