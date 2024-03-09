// controllers/cultureController.js
const Culture = require('../Models/Culture');

// Créer une nouvelle culture
exports.createCulture = async (req, res) => {
  console.log(req.body);
  const { nom_culture, date_plantation, date_recolte, methode_irrigation, quantite_eau_irrigation, frequence_surveillance, date_derniere_surveillance, remarques } = req.body;
  const imageName = req.file.filename;
 
  try {
    await Culture.create({ 
      nom_culture: nom_culture,
      date_plantation: date_plantation,
      date_recolte: date_recolte,
      methode_irrigation: methode_irrigation,
      quantite_eau_irrigation: quantite_eau_irrigation,
      frequence_surveillance: frequence_surveillance,
      date_derniere_surveillance: date_derniere_surveillance,
      image_culture: imageName, 
      remarques: remarques

    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

// Récupérer toutes les cultures
exports.getCultures = async (req, res) => {
  try {
    const cultures = await Culture.find().populate('saison categorie materiels stocks');
    res.status(200).json({ success: true, data: cultures });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer une culture par son ID
exports.getCultureById = async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id).populate('saison categorie materiels stocks');
    if (!culture) {
      return res.status(404).json({ success: false, message: 'Culture not found' });
    }
    res.status(200).json({ success: true, data: culture });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mettre à jour une culture par son ID
exports.updateCulture = async (req, res) => {
  try {
    const culture = await Culture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!culture) {
      return res.status(404).json({ success: false, message: 'Culture not found' });
    }
    res.status(200).json({ success: true, data: culture });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Supprimer une culture par son ID
exports.deleteCulture = async (req, res) => {
  try {
    const culture = await Culture.findByIdAndDelete(req.params.id);
    if (!culture) {
      return res.status(404).json({ success: false, message: 'Culture not found' });
    }
    res.status(200).json({ success: true, message: 'Culture deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


