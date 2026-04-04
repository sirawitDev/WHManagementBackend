const mongoose = require('mongoose');

const stockReportsSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, //code stock
    goodIssueCode: { type: String, required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'materials', required: true },
    materialCode: { type: String, required: true },
    productName: { type: String, required: true },
    transactionType: { type: String, required: true },

    quantity: { type: Number, required: true }, // จำนวนที่เปลี่ยนแปลง
    previousStock: { type: Number, required: true }, // คงเหลือก่อนหน้า
    currentStock: { type: Number, required: true }, // คงเหลือหลังเปลี่ยนแปลง

    unitId: { type: String },
    warehouseLocation: { type: String },
    remark: { type: String },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

stockReportsSchema.index({ goodIssueCode: 1 });
stockReportsSchema.index({ materialId: 1 });
stockReportsSchema.index({ createdAt: -1 });
stockReportsSchema.index({ transactionType: 1 });

const StockReport = mongoose.model('stock-reports', stockReportsSchema);

module.exports = StockReport;
