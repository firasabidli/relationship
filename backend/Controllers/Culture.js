// controllers/cultureController.js
const Culture = require('../Models/Culture');
const fs = require('fs');

// Créer une nouvelle culture
exports.createCulture = async (req, res) => {
  console.log(req.body);
  const { nom_culture, date_plantation, date_recolte, methode_irrigation, quantite_eau_irrigation, frequence_surveillance, date_derniere_surveillance, remarques } = req.body;
  const imageName = req.file.filename;
 
  try {
    await Culture.create({ 
      nom_culture: nom_culture,
      date_plantation: date_plantation,
      date_recolte: date_recolte,
      methode_irrigation: methode_irrigation,
      quantite_eau_irrigation: quantite_eau_irrigation,
      frequence_surveillance: frequence_surveillance,
      date_derniere_surveillance: date_derniere_surveillance,
      image_culture: imageName, 
      remarques: remarques

    });
    res.json({ success: true, message: 'Culture created' });
  } catch (error) {
    res.json({ success: false,  message: err.message });
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
    const { nom_culture, date_plantation, date_recolte, methode_irrigation, quantite_eau_irrigation, frequence_surveillance, date_derniere_surveillance, remarques } = req.body;

    let updateData = {
      nom_culture,
      date_plantation,
      date_recolte,
      methode_irrigation,
      quantite_eau_irrigation,
      frequence_surveillance,
      date_derniere_surveillance,
      remarques
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



