// routes/Categorie.js
const express = require('express');
const router = express.Router();
const categorieController = require('../Controllers/Categorie');

// Créer une nouvelle catégorie
router.post('/', categorieController.createCategorie);

// Récupérer toutes les catégories
router.get('/', categorieController.getCategories);

// Récupérer une catégorie par son ID
router.get('/:id', categorieController.getCategorieById);

// Mettre à jour une catégorie par son ID
router.put('/:id', categorieController.updateCategorie);

// Supprimer une catégorie par son ID
router.delete('/:id', categorieController.deleteCategorie);

module.exports = router;
