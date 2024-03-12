// controllers/cultureController.js
const Culture = require('../Models/Culture');
const fs = require('fs');


//create culture
exports.createCulture = async (req, res) => {
  const {
    nom_culture,
    date_plantation,
    date_recolte,
    methode_irrigation,
    quantite_eau_irrigation,
    frequence_surveillance,
    date_derniere_surveillance,
    remarques,
    saisonId, // Identifiant de la saison sélectionnée
    categorieId, // Identifiant de la catégorie sélectionnée
    materials, // Matériaux sélectionnés
    stocks, // Stocks sélectionnés
    // Ajoutez d'autres identifiants pour les matériels et les stocks si nécessaire
  } = req.body;

  const imageName = req.file.filename;

  try {
    // Create the culture entry
    const newCulture = await Culture.create({
      nom_culture,
      date_plantation,
      date_recolte,
      methode_irrigation,
      quantite_eau_irrigation,
      frequence_surveillance,
      date_derniere_surveillance,
      image_culture: imageName,
      remarques,
      saison: saisonId, 
      categorie: categorieId,
      materiels: materials,
      stocks:stocks, 
      
    });

    // Associate selected materials with the culture
    

    res.json({ success: true, message: 'Culture created', data: newCulture });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Récupérer toutes les cultures
exports.getCultures = async (req, res) => {
  try {
    const cultures = await Culture.find().populate('saison categorie materiels stocks');
    res.status(200).json({ success: true, data: cultures });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Récupérer une culture par son ID
exports.getCultureById = async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id).populate('saison categorie materiels stocks');
    if (!culture) {
      return res.status(404).json({ success: false, message: 'Culture not found' });
    }
    res.status(200).json({ success: true, data: culture });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mettre à jour une culture par son ID
exports.updateCulture = async (req, res) => {
  try {
    const { nom_culture, date_plantation, date_recolte, methode_irrigation, quantite_eau_irrigation, frequence_surveillance, date_derniere_surveillance, remarques, saisonId, categorieId, materials, stocks } = req.body;

    let updateData = {
      nom_culture,
      date_plantation,
      date_recolte,
      methode_irrigation,
      quantite_eau_irrigation,
      frequence_surveillance,
      date_derniere_surveillance,
      remarques,
      saison: saisonId,
      categorie: categorieId,
      materiels: materials,
      stocks:stocks, 
    };

    // Vérifiez si une nouvelle image est téléchargée
    if (req.file) {
      // Supprimez l'ancienne image
      const culture = await Culture.findById(req.params.id);
      if (culture) {
        const imagePath = `../frontend/src/images/${culture.image_culture}`;
        fs.unlinkSync(imagePath);
      }

      // Mettez à jour le nom de l'image dans la base de données
      const imageName = req.file.filename;
      updateData.image_culture = imageName;
    }

    const updatedCulture = await Culture.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedCulture) {
      return res.status(404).json({ success: false, message: 'Culture not found' });
    }

    res.status(200).json({ success: true,message: 'Culture Updated', data: updatedCulture });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Supprimer une culture par son ID
// Supprimer une culture par son ID
exports.deleteCulture = async (req, res) => {
  try {
    const culture = await Culture.findByIdAndDelete(req.params.id);
    if (!culture) {
      return res.status(404).json({ success: false, message: 'Culture not found' });
    }
    
    // Supprimer l'image associée
    const imagePath = `../frontend/src/images/${culture.image_culture}`;
    fs.unlinkSync(imagePath);

    res.status(200).json({ success: true, message: 'Culture deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



