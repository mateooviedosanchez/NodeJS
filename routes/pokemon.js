const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post('/', (req, res, next) => {
    return res.status(200).send(req.body);
});

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query('SELECT * FROM pokemon');
    return res.status(200).json({code: 1, message: pkmn});
});

pokemon.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    if (isNaN(id)) return next(); // si no es número pasa a /:name

    const pkmn = await db.query('SELECT * FROM pokemon WHERE pok_id = ?', [id]);
    (pkmn.length > 0) ?
        res.status(200).json({ code: 1, message: pkmn }) :
        res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
});

pokemon.get('/:name', async (req, res, next) => {
    const name = req.params.name;

    const pkmn = await db.query('SELECT * FROM pokemon WHERE UPPER(pok_name) = UPPER(?)', [name]);
    (pkmn.length > 0) ?
        res.status(200).json({ code: 1, message: pkmn }) :
        res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
});

module.exports = pokemon;