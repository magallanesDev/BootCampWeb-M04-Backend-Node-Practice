'use strict';

const express = require('express');
const createError = require('http-errors');
const Anuncio = require('../../models/Anuncio');

const router = express.Router();

/*
 * /api/anuncios:
 *  get:
 *    description: Devuelve una lista de anuncios
 *    responses:
 *     200:
 *        description: Returns JSON
 */
router.get('/', async (req, res, next) => {
  try {
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select; // campos que quiero
    const sort = req.query.sort;

    const filtros = {};

    if (nombre) {
      filtros.nombre = nombre;
    }

    if (precio) {
      filtros.precio = precio
    }

    const anuncios = await Anuncio.lista(filtros, skip, limit, select, sort);

    res.json({ results: anuncios })

  } catch (err) {
    next(err);
  }
});

// GET /api/anuncios/:id
// Devuelve un anuncio
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const anuncio = await Anuncio.findOne({ _id: id });

    if (!anuncio) {
      next(createError(404));
      return;
    }

    res.json({ result: anuncio });
  } catch (err) {
    next(err);
  }
});

// POST /api/anuncios
// Crea un nuevo anuncios
router.post('/', async (req, res, next) => {
  try {
    const anuncioData = req.body;

    // creo un objeto de anuncio EN MEMORIA
    const anuncio = new Anuncio(anuncioData);

    const anuncioGuardado = await anuncio.save();

    res.status(201).json({ result: anuncioGuardado });

  } catch (err) {
    next(err);
  }
})

// DELETE /api/anuncios/:id
// Elimina un anuncio
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    await Anuncio.deleteOne({ _id: id });

    res.json();
  } catch (err) {
    next(err)
  }

})

// PUT /api/anuncios:id
// Actualizar un anuncio
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const anuncioData = req.body;

    let anuncioActualizado
    try {
      anuncioActualizado = await Anuncio.findByIdAndUpdate(id, anuncioData, {
        new: true // esta opción sirve para que nos devuelva el estado final del documento
      });
    } catch (err) {
      next(createError(422, 'invalid id'));
      return;
    }

    if (!anuncioActualizado) {
      next(createError(404));
      return;
    }

    res.json({ result: anuncioActualizado });
  } catch (err) {
    next(err);
  }
});

module.exports = router;