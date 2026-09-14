const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
GET - obtener recursos
POST - almacenar/crear recursos
PATCH - modificar/actualizar una parte de un recursos
PUT - modificar/actualizar un recurso
DELETE - eliminar recursos
*/

app.get('/', (req, res, next) => {
    return res.status(200).send("Bienvenido a la Pokedex");
});

app.post('/pokemon', (req, res, next) => {
    return res.status(200).send(req.body);
});

app.get('/pokemon', (req, res, next) => {
    console.log(req.params.name);
    return res.status(200).send(pokemon);
});

// ya no funciona regex en esta version
// '/pokemon/:id([0-9]{1,3})'
app.get('/pokemon/:id', (req, res, next) => {
    const id = req.params.id - 1;
    (id >= 0 && id <= 150) ? 
        res.status(200).send(pokemon[req.params.id - 1]) : 
        res.status(404).send("Pokemon no encontrado");
});

// Esta parte no funciona porque no se puede diferenciar entre un id y un nombre
app.get('/pokemon/:name', (req, res, next) => {
    const name = req.params.name;

    const pk = pokemon.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

    (pk.length > 0) ? 
    res.status(200).send(pk) : 
    res.status(404).send("Pokemon no encontrado");
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});