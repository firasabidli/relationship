const express = require('express');
const mongoose = require('mongoose');
const CultureRouter = require('./Routes/Culture');
const StockRouter = require('./Routes/Stock');
const CategorieRouter = require('./Routes/Categorie');
const SaisonRouter = require('./Routes/Saison');
const MaterielRouter = require('./Routes/Materiel');

const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/RelationShip',)
  .then(() => console.log('Connected successfully to MongoDB !'))
  .catch(() => console.log('Connection failed to MongoDB !'));

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/culture', CultureRouter);
  app.use('/api/categorie', CategorieRouter);
  app.use('/api/saison', SaisonRouter);
  app.use('/api/stock', StockRouter);
  app.use('/api/materiel', MaterielRouter);
module.exports = app;