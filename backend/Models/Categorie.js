const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
  nom_categorie: String,
  cultures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Culture' }]
});

module.exports = mongoose.model('Categorie', categorieSchema);