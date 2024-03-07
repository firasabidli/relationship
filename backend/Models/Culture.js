const mongoose = require('mongoose');

const cultureSchema = new mongoose.Schema({
    nom_culture: String,
    date_plantation: Date,
    date_recolte: Date,
    methode_irrigation: String,
    quantite_eau_irrigation: Number,
    frequence_surveillance: String,
    date_derniere_surveillance: String,
    image_culture: String,
    remarques: String,
  saison: { type: mongoose.Schema.Types.ObjectId, ref: 'Saison' },
  categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' },
  materiels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Materiel' }],
  stocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }]
});

module.exports = mongoose.model('Culture', cultureSchema);