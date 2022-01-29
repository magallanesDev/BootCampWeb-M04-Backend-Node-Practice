'use strict';

var express = require('express');
var router = express.Router();

const Anuncio = require('../models/Anuncio');

/* GET home page. */

/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nodepop' });
});
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

    console.log(anuncios);

    res.render('index', { results: anuncios });

  } catch (err) {
    next(err);
  }
});

module.exports = router;