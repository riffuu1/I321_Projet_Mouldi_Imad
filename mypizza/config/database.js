import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'UCH1H4_N1GHTabcd',      // Vérifie que c'est bien ton mot de passe
    database: 'pizzayolo', // Le nom de ta base créée en SQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// On exporte uniquement le pool, pas de fonctions bizarres
export default pool;