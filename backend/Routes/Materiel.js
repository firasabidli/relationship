// routes/Materiel.js
const express = require('express');
const router = express.Router();
const materielController = require('../Controllers/Materiel');

// Créer un nouveau matériel
router.post('/', materielController.createMateriel);

// Récupérer tous les matériels
router.get('/', materielController.getMateriels);

// Récupérer un matériel par son ID
router.get('/:id', materielController.getMaterielById);

// Mettre à jour un matériel par son ID
router.put('/:id', materielController.updateMateriel);

// Supprimer un matériel par son ID
router.delete('/:id', materielController.deleteMateriel);

module.exports = router;
