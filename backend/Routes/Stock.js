// routes/Stock.js
const express = require('express');
const router = express.Router();
const stockController = require('../Controllers/Stock');

// Créer un nouveau stock
router.post('/', stockController.createStock);

// Récupérer tous les stocks
router.get('/', stockController.getStocks);

// Récupérer un stock par son ID
router.get('/:id', stockController.getStockById);

// Mettre à jour un stock par son ID
router.put('/:id', stockController.updateStock);

// Supprimer un stock par son ID
router.delete('/:id', stockController.deleteStock);

module.exports = router;
