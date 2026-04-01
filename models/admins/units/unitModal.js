const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },

}, {
    timestamps: true
});

const Unit = mongoose.model('units', unitSchema);

module.exports = Unit;
