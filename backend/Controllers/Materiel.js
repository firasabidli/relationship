// controllers/materielController.js
const Materiel = require('../Models/Materiel');

// Créer un nouveau matériel
exports.createMateriel = async (req, res) => {
  try {
    const materiel = await Materiel.create(req.body);
    res.status(201).json({ success: true, data: materiel });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Récupérer tous les matériels
exports.getMateriels = async (req, res) => {
  try {
    const materiels = await Materiel.find().populate('cultures');
    res.status(200).json({ success: true, data: materiels });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer un matériel par son ID
exports.getMaterielById = async (req, res) => {
  try {
    const materiel = await Materiel.findById(req.params.id).populate('cultures');
    if (!materiel) {
      return res.status(404).json({ success: false, message: 'Materiel not found' });
    }
    res.status(200).json({ success: true, data: materiel });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mettre à jour un matériel par son ID
exports.updateMateriel = async (req, res) => {
  try {
    const materiel = await Materiel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!materiel) {
      return res.status(404).json({ success: false, message: 'Materiel not found' });
    }
    res.status(200).json({ success: true, data: materiel });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Supprimer un matériel par son ID
exports.deleteMateriel = async (req, res) => {
  try {
    const materiel = await Materiel.findByIdAndDelete(req.params.id);
    if (!materiel) {
      return res.status(404).json({ success: false, message: 'Materiel not found' });
    }
    res.status(200).json({ success: true, message: 'Materiel deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

