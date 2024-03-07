// controllers/stockController.js
const Stock = require('../Models/Stock');

// Créer un nouveau stock
exports.createStock = async (req, res) => {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json({ success: true, data: stock });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Récupérer tous les stocks
exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().populate('cultures');
    res.status(200).json({ success: true, data: stocks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer un stock par son ID
exports.getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id).populate('cultures');
    if (!stock) {
      return res.status(404).json({ success: false, message: 'Stock not found' });
    }
    res.status(200).json({ success: true, data: stock });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mettre à jour un stock par son ID
exports.updateStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stock) {
      return res.status(404).json({ success: false, message: 'Stock not found' });
    }
    res.status(200).json({ success: true, data: stock });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Supprimer un stock par son ID
exports.deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    if (!stock) {
      return res.status(404).json({ success: false, message: 'Stock not found' });
    }
    res.status(200).json({ success: true, message: 'Stock deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

