const express = require('express');
const pool = require('../db/db');
const router = express.Router();

// new schema
router.post('/create', async(req, res) => {
    const { name, attributes } = req.body;

    if(!name || !attributes) {
        return res.status(400)
            .json({ error: 'Schema name and attributes are require' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO schemas (name, attributes) VALUES ($1, $2) RETURNING *',
            [name, attributes]
        );
        res.status(201)
            .json({ message: 'Schema created successfully', schema: result.rows[0] });
    }

    catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// fetch schemas
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(' SELECT * FROM schemas ');
        res.json(result.rows);
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;