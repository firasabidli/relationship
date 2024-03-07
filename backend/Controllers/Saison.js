// controllers/saisonController.js
const Saison = require('../Models/Saison');

// Créer une nouvelle saison
exports.createSaison = async (req, res) => {
  try {
    const saison = await Saison.create(req.body);
    res.status(201).json({ success: true, data: saison });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Récupérer toutes les saisons
exports.getSaisons = async (req, res) => {
  try {
    const saisons = await Saison.find().populate('cultures');
    res.status(200).json({ success: true, data: saisons });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer une saison par son ID
exports.getSaisonById = async (req, res) => {
  try {
    const saison = await Saison.findById(req.params.id).populate('cultures');
    if (!saison) {
      return res.status(404).json({ success: false, message: 'Saison not found' });
    }
    res.status(200).json({ success: true, data: saison });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mettre à jour une saison par son ID
exports.updateSaison = async (req, res) => {
  try {
    const saison = await Saison.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!saison) {
      return res.status(404).json({ success: false, message: 'Saison not found' });
    }
    res.status(200).json({ success: true, data: saison });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Supprimer une saison par son ID
exports.deleteSaison = async (req, res) => {
  try {
    const saison = await Saison.findByIdAndDelete(req.params.id);
    if (!saison) {
      return res.status(404).json({ success: false, message: 'Saison not found' });
    }
    res.status(200).json({ success: true, message: 'Saison deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

