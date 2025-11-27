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
        const sql = `SELECT
                         p.id,
                         p.name,
                         p.price,
                         GROUP_CONCAT(i.name) AS ingredients
                     FROM pizzas p
                              LEFT JOIN pizza_ingredients pi ON p.id = pi.pizza_id
                              LEFT JOIN ingredients i ON pi.ingredient_id = i.id
                     GROUP BY p.id`;
        try {
            const [rows] = await db.query(sql);
            return rows.map(row => ({
                id: row.id,
                name: row.name,
                price: row.price,
                ingredients: row.ingredients ? row.ingredients.split(',') : []
            }));
        }catch (err) {
            throw err;
        }
    }


    // FIND BY ID
    static async findById(id) {
        const sql = `SELECT p.id,
                            p.name,
                            p.price,
                            GROUP_CONCAT(i.name) AS ingredients
                     FROM pizzas p
                              LEFT JOIN pizza_ingredients pi ON p.id = pi.pizza_id
                              LEFT JOIN ingredients i ON pi.ingredient_id = i.id
                     WHERE p.id = ?
                     GROUP BY p.id`;
        try {
            const [rows] = await db.execute(sql, [id]);
            return rows.length > 0
                ? {
                    id: rows[0].id,
                    name: rows[0].name,
                    price: rows[0].price,
                    ingredients: rows[0].ingredients ? rows[0].ingredients.split(',') : []
                }
                : null; // si aucune pizza trouvée
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
}

export default Pizza;