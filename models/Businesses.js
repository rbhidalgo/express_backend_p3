const mongoose = require('mongoose';

const BusinessesSchema = new mongoose.Schema({
    name: String,
    url: String,
    coordinates: {},
    image: String,
    location: String
});

module.exports = mongoose.model('Businesses', BusinessesSchema);