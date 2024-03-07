// controllers/categorieController.js
const Categorie = require('../Models/Categorie');

// Créer une nouvelle catégorie
exports.createCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.create(req.body);
    res.status(201).json({ success: true, data: categorie });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Récupérer toutes les catégories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Categorie.find().populate('cultures');
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer une catégorie par son ID
exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id).populate('cultures');
    if (!categorie) {
      return res.status(404).json({ success: false, message: 'Categorie not found' });
    }
    res.status(200).json({ success: true, data: categorie });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mettre à jour une catégorie par son ID
exports.updateCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categorie) {
      return res.status(404).json({ success: false, message: 'Categorie not found' });
    }
    res.status(200).json({ success: true, data: categorie });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Supprimer une catégorie par son ID
exports.deleteCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie) {
      return res.status(404).json({ success: false, message: 'Categorie not found' });
    }
    res.status(200).json({ success: true, message: 'Categorie deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


