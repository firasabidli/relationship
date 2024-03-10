// Routes/Culture.js
const express = require('express');
const router = express.Router();
const cultureController = require('../Controllers/Culture');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
// Créer une nouvelle culture
router.post('/',upload.single("image_culture"), cultureController.createCulture);

// Récupérer toutes les cultures
router.get('/', cultureController.getCultures);

// Récupérer une culture par son ID
router.get('/:id', cultureController.getCultureById);

// Mettre à jour une culture par son ID
router.put('/:id',upload.single("image_culture"), cultureController.updateCulture);

// Supprimer une culture par son ID
router.delete('/:id', cultureController.deleteCulture);

module.exports = router;
