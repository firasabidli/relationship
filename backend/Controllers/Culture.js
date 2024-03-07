// controllers/cultureController.js
const Culture = require('../Models/Culture');

// Créer une nouvelle culture
exports.createCulture = async (req, res) => {
  try {
    const culture = await Culture.create(req.body);
    res.status(201).json({ success: true, data: culture });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
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


