const mongoose = require('mongoose');

const saisonSchema = new mongoose.Schema({
  nom_saison: String,
  cultures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Culture' }]
});

module.exports = mongoose.model('Saison', saisonSchema);