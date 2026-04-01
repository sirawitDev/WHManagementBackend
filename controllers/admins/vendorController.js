const Venders = require('../../models/admins/vender/vendorModal');

// ✅ GET ALL
exports.getVenders = async (req, res) => {
    try {
        const venders = await Venders.find();
        res.status(200).json(venders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getVenderById = async (req, res) => {
    try {
        const vender = await Venders.findById(req.params.id);
        if (!vender) {
            return res.status(404).json({ message: 'Vender not found' });
        }
        res.status(200).json(vender);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ CREATE (POST)
exports.createVender = async (req, res) => {
    try {
        // หา code ล่าสุด
        const lastVender = await Venders.findOne().sort({ code: -1 }).collation({ locale: "en_US", numericOrdering: true });
        let nextCode = 'VD0001';
        if (lastVender && lastVender.code) {
            const lastNum = parseInt(lastVender.code.replace('VD', ''), 10);
            const newNum = lastNum + 1;
            nextCode = 'VD' + newNum.toString().padStart(4, '0');
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

        const newVender = new Venders({
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

        const saved = await newVender.save();
        res.status(201).json(saved);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ UPDATE (PUT)
exports.updateVender = async (req, res) => {
    try {
        const updated = await Venders.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Vender not found' });
        }

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ DELETE
exports.deleteVender = async (req, res) => {
    try {
        const deleted = await Venders.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Vender not found' });
        }

        res.status(200).json({ message: 'Vender deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};