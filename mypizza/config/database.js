const sqlite3 = require('sqlite3').verbose();

// Ouvre ou crée une base locale
const db = new sqlite3.Database('./ma_base.db', (err) => {
    if (err) {
        console.error('Erreur ouverture base :', err.message);
    } else {
        console.log('Base SQLite connectée ✅');
    }
});

// Créer une table
db.run(`CREATE TABLE IF NOT EXISTS utilisateurs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT,
  email TEXT
)`);

// Insérer une donnée
db.run(`INSERT INTO utilisateurs (nom, email) VALUES (?, ?)`, ['Alice', 'alice@example.com']);

// Lire les données
db.all(`SELECT * FROM utilisateurs`, [], (err, rows) => {
    if (err) throw err;
    console.log(rows);
});

// Fermer la base
db.close();
