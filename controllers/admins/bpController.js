const BusinessPartner = require('../../models/admins/bp/BusinessPartner');

// ✅ GET ALL
exports.getBusinessPartner = async (req, res) => {
    try {
        const partners = await BusinessPartner.find();
        res.status(200).json(partners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBusinessPartnerById = async (req, res) => {
    try {
        const partner = await BusinessPartner.findById(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: 'BusinessPartner not found' });
        }
        res.status(200).json(partner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ CREATE (POST)
exports.createBusinessPartner = async (req, res) => {
    try {
        // หา code ล่าสุด
        const lastPartner = await BusinessPartner.findOne().sort({ code: -1 }).collation({ locale: "en_US", numericOrdering: true });
        let nextCode = 'BP0001';
        if (lastPartner && lastPartner.code) {
            const lastNum = parseInt(lastPartner.code.replace('BP', ''), 10);
            const newNum = lastNum + 1;
            nextCode = 'BP' + newNum.toString().padStart(4, '0');
        }

        const {
            name,
            description,
            tel1,
            tel2,
            fax,
            mobilePhone,
            email,
            businessType,
            website
        } = req.body;

        const newBusinessPartner = new BusinessPartner({
            code: nextCode,
            name,
            description,
            tel1,
            tel2,
            fax,
            mobilePhone,
            email,
            businessType,
            website
        });

        const saved = await newBusinessPartner.save();
        res.status(201).json(saved);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ UPDATE (PUT)
exports.updateBusinessPartner = async (req, res) => {
    try {
        const updated = await BusinessPartner.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'BusinessPartner not found' });
        }

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ DELETE
exports.deleteBusinessPartner = async (req, res) => {
    try {
        const deleted = await BusinessPartner.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'BusinessPartner not found' });
        }

        res.status(200).json({ message: 'BusinessPartner deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};