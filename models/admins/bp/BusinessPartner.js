const mongoose = require('mongoose');

const BusinessPartnerSchema = new mongoose.Schema({
    code: {type:String, required: true, unique: true},
    name: { type: String, required: true, unique: true},
    description: { type: String, required: false },

    tel1: { type: String, default: '' },
    tel2: { type: String, default: '' },
    fax: { type: String, default: '' },
    mobilePhone: { type: String, default: '' },
    email: { type: String, default: '' },
    businessType: { type: String, default: '' },
    website: { type: String, default: '' }

}, {
    timestamps: true
});

const BusinessPartner = mongoose.model('BusinessPartner', BusinessPartnerSchema);

module.exports = BusinessPartner;
