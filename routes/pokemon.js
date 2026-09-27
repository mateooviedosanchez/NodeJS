const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post('/', (req, res, next) => {
    return res.status(200).send(req.body);
});

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query('SELECT * FROM pokemon');
    return res.status(200).json(pkmn);
});

// ya no funciona regex en esta version
// '/pokemon/:id([0-9]{1,3})'
pokemon.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    if (isNaN(id)) return next(); // no es número → pasa a /:name

    const pkmn = await db.query('SELECT * FROM pokemon WHERE pok_id = ?', [id]);
    (pkmn.length > 0) ?
        res.status(200).json(pkmn) :
        res.status(404).send("Pokemon no encontrado");
});

pokemon.get('/:name', async (req, res, next) => {
    const name = req.params.name;

    const pkmn = await db.query('SELECT * FROM pokemon WHERE UPPER(pok_name) = UPPER(?)', [name]);
    (pkmn.length > 0) ?
        res.status(200).json(pkmn) :
        res.status(404).send("Pokemon no encontrado");
});

module.exports = pokemon;