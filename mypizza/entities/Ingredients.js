var db = require('../config/database.js').default;

class Ingredients {

    // CREATE
    static async create({ name}) {
        const sql = `INSERT INTO ingredients (name) VALUES (?)`;

        try {
            const [result] = await db.execute(sql, [name]);
            return this.findById(result.insertId);
        } catch (err) {
            throw err;
        }
    }

    // FIND ALL
    static async findAll() {
        const sql = `SELECT * FROM ingredients`;
        try {
            const [rows] = await db.query(sql);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    // FIND BY ID
    static async findById(id) {
        const sql = `SELECT * FROM ingredients WHERE id = ?`;
        try {
            const [rows] = await db.execute(sql, [id]);
            return rows[0] || null;
        } catch (err) {
            throw err;
        }
    }

    // UPDATE
    static async update(id, { name}) {

        const newName = name ?? null;
        const sql = `
            UPDATE ingredients
            SET name = COALESCE(?, name)
            WHERE id = ?`;

        try {
            const [result] = await db.execute(sql, [newName, id]);
            if (result.affectedRows === 0) return null;
            return this.findById(id);
        } catch (err) {
            throw err;
        }
    }

    // DELETE
    static async delete(id) {
        const sql = `DELETE FROM ingredients WHERE id = ?`;
        try {
            const [result] = await db.execute(sql, [id]);
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Ingredients;
