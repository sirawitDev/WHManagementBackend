const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    code: { type: String},
    categoryId: { type: String, required: false },
    unitId: { type: String, required: false },
    productName: { type: String, required: false },
    ownerName: { type: String, required: false },
    // invoiceNo: { type: String, required: false },
    // packageId: { type: String, required: false },
    // lotNo: { type: String, required: false },
    receivedAt: { type: Date, required: false },
    quantity: { type: Number, required: false },
    warehouseLocation: { type: String, required: false },
    createdBy: { type: String, required: false },

}, {
    timestamps: true
});

const Material = mongoose.model('materials', materialSchema);

module.exports = Material;
