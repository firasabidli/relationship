const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: String,
  description: String,
  cultures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Culture' }]
});

module.exports = mongoose.model('Stock', stockSchema);