// models/Materiel.js
const mongoose = require('mongoose');

const materielSchema = new mongoose.Schema({
  name: String,
  description: String,
  image_materiel: String,
  cultures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Culture' }]
});

module.exports = mongoose.model('Materiel', materielSchema);
