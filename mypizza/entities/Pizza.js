import db from '../config/database.js';

class Pizza {

    // CREATE
    static async create({ name, description, imageUrl, price }) {
        const sql = `INSERT INTO pizzas (name, price, created_at) VALUES (?, ?, NOW())`;
        // Note: j'ai simplifié pour coller à ta table SQL créée plus tôt. Ajoute description/image si ta table les a.

        try {
            const [result] = await db.execute(sql, [name, price]);
            // En MySQL, l'ID créé est dans result.insertId
            return this.findById(result.insertId);
        } catch (err) {
            throw err;
        }
    }

    // FIND ALL
    static async findAll() {
        const sql = `SELECT * FROM pizzas`;
        try {
            const [rows] = await db.query(sql);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    // FIND BY ID
    static async findById(id) {
        const sql = `SELECT * FROM pizzas WHERE id = ?`;
        try {
            const [rows] = await db.execute(sql, [id]);
            return rows[0] || null;
        } catch (err) {
            throw err;
        }
    }

    // UPDATE
    static async update(id, { name, price }) {
        // COALESCE fonctionne, mais attention à la syntaxe SQL stricte
        const sql = `
            UPDATE pizzas 
            SET name = COALESCE(?, name), 
                price = COALESCE(?, price)
            WHERE id = ?`;

        try {
            const [result] = await db.execute(sql, [name, price, id]);
            if (result.affectedRows === 0) return null;
            return this.findById(id);
        } catch (err) {
            throw err;
        }
    }

    // DELETE
    static async delete(id) {
        const sql = `DELETE FROM pizzas WHERE id = ?`;
        try {
            const [result] = await db.execute(sql, [id]);
            return result.affectedRows; // Retourne le nombre de lignes supprimées
        } catch (err) {
            throw err;
        }
    }

    static async findDailyPizza() {
        const sql = `SELECT p.* FROM pizzas p JOIN pizza_du_jour pdj
        on p.id = pdj.pizza_id_choix LIMIT 1`;

        try {
            const [rows] = await db.query(sql);
            return rows[0] || null;
        } catch (err) {
            console.error("Error getting pizza_du_jour", err);
            throw err;
        }

    }
}

export default Pizza;