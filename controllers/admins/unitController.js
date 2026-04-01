const Unit = require('../../models/admins/units/unitModal');

// ✅ GET ALL
exports.getUnit = async (req, res) => {
    try {
        const units = await Unit.find();
        res.status(200).json(units);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ GET BY ID
exports.getUnitById = async (req, res) => {
    try {
        const unit = await Unit.findById(req.params.id);
        if (!unit) {
            return res.status(404).json({ message: 'Unit not found' });
        }
        res.status(200).json(unit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ CREATE (POST)
exports.createUnit = async (req, res) => {
    try {
        // หา code ล่าสุด
        const lastUnit = await Unit.findOne().sort({ code: -1 }).collation({ locale: "en_US", numericOrdering: true });
        let nextCode = 'UN0001';
        if (lastUnit && lastUnit.code) {
            const lastNum = parseInt(lastUnit.code.replace('UN', ''), 10);
            const newNum = lastNum + 1;
            nextCode = 'UN' + newNum.toString().padStart(4, '0');
        }

        const {
            name,
            description,
        } = req.body;

        const newUnit = new Unit({
            code: nextCode,
            name,
            description,
        });

        const saved = await newUnit.save();
        res.status(201).json(saved);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ UPDATE (PUT)
exports.updateUnit = async (req, res) => {
    try {
        const updated = await Unit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ DELETE
exports.deleteUnit = async (req, res) => {
    try {
        const deleted = await Unit.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.status(200).json({ message: 'Unit deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};