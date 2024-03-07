// routes/Saison.js
const express = require('express');
const router = express.Router();
const saisonController = require('../Controllers/Saison');

// Créer une nouvelle saison
router.post('/', saisonController.createSaison);

// Récupérer toutes les saisons
router.get('/', saisonController.getSaisons);

// Récupérer une saison par son ID
router.get('/:id', saisonController.getSaisonById);

// Mettre à jour une saison par son ID
router.put('/:id', saisonController.updateSaison);

// Supprimer une saison par son ID
router.delete('/:id', saisonController.deleteSaison);

module.exports = router;
