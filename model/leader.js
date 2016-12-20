const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema({
 season: String,
 week: Number,
 positions: Array,
 timestamp: String
});

module.exports = mongoose.model('Leader', leaderSchema);