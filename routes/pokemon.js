const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post('/', async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    
    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)"
        query += ` VALUES('${pok_name}', '${pok_height}', '${pok_weight}', '${pok_base_experience}')`;
        const rows = await db.query(query);
        console.log(rows);

        if(rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Pokemon creado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Ocurrio un error"});

    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query('SELECT * FROM pokemon');
    return res.status(200).json({code: 200, message: pkmn});
});

pokemon.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    if (isNaN(id)) return next(); // si no es número pasa a /:name

    const pkmn = await db.query('SELECT * FROM pokemon WHERE pok_id = ?', [id]);
    (pkmn.length > 0) ?
        res.status(200).json({ code: 200, message: pkmn }) :
        res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
});

pokemon.get('/:name', async (req, res, next) => {
    const name = req.params.name;

    const pkmn = await db.query('SELECT * FROM pokemon WHERE UPPER(pok_name) = UPPER(?)', [name]);
    (pkmn.length > 0) ?
        res.status(200).json({ code: 200, message: pkmn }) :
        res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
});

module.exports = pokemon;