const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },

}, {
    timestamps: true
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
