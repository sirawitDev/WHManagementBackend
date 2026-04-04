const mongoose = require('mongoose');

const goodIssueSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },

    issueDate: { type: Date, default: Date.now },

    businessPartnerCode: { type: String },

    items: {
        type: [
            {
                materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'material', required: true },
                code: { type: String, required: true },
                productName: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                warehouseLocation: { type: String, required: true },
                unitId: { type: String, required: true },
                remark: String
            }
        ],
        validate: [arr => arr.length > 0, 'Items must not be empty']
    },

    categories: [{ type: String }],

    vendorReference: { type: String },

    remark: { type: String },

    createdBy: { type: String },
}, {
    timestamps: true
});

goodIssueSchema.index({ code: 1 });
goodIssueSchema.index({ issueDate: -1 });

const goodIssue = mongoose.model('good_issue', goodIssueSchema);

module.exports = goodIssue;