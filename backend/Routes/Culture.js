// Routes/Culture.js
const express = require('express');
const router = express.Router();
const cultureController = require('../Controllers/Culture');

// Créer une nouvelle culture
router.post('/', cultureController.createCulture);

// Récupérer toutes les cultures
router.get('/', cultureController.getCultures);

// Récupérer une culture par son ID
router.get('/:id', cultureController.getCultureById);

// Mettre à jour une culture par son ID
router.put('/:id', cultureController.updateCulture);

// Supprimer une culture par son ID
router.delete('/:id', cultureController.deleteCulture);

module.exports = router;
