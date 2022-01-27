'use strict';

const mongoose = require('mongoose');

// definir un esquema
const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
});

// creo el modelo con ese esquema
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// opcional - exporto el modelo
module.exports = Anuncio;

  