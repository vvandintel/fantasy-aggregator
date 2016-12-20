const mongoose = require('mongoose');

const newsArchiveSchema = new mongoose.Schema({
 timestamp: String,
 newsList: Array
});

module.exports = mongoose.model('NewsArchive', newsArchiveSchema);