const mongoose = require('mongoose');

const locationWhSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },

}, {
    timestamps: true
});

const LocationsWh = mongoose.model('locations_wh', locationWhSchema);

module.exports = LocationsWh;
