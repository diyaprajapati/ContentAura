const express = require('express');
const pool = require('../db/db');
const { createJoiSchema } = require('../utils/schemaUtils');
const router = express.Router();

// validate data
router.post('/validate/:schemaId', async (req, res) => {
    try {
        const { schemaId } = req.params;
        const { data } = req.body;

        const schemaResult = await pool.query('SELECT * FROM scheams WHERE id = $1', [schemaId]);

        if(schemaResult.rowCount === 0) {
            return res.status(404).json({ error: 'Schema not found' });
        }

        const schema = schemaResult.rows[0];
        const joiSchema = createJoiSchema(schema.attributes);

        const { error } = joiSchema.validate(data);

        if(error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // save valid data
        await pool.query(
            'INSERT INTO content (schema_id, data) VALUES ($1, $2)',
            [schemaId, data]
        );

        res.json({ message: 'Validation successfull and data saved' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;