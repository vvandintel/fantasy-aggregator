const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
 firstName: String,
 lastName: String,
 position: String,
 teamAbbr: String,
 body: String,
 analysis: String,
 timestamp: String
});

module.exports = mongoose.model('News', newsSchema);