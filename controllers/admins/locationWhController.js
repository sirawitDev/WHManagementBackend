const LocationsWh = require('../../models/admins/locationsWh/locationWhModal');

// ✅ GET ALL
exports.getLocationWh = async (req, res) => {
    try {
        const locationwh = await LocationsWh.find();
        res.status(200).json(locationwh);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ GET BY ID
exports.getLocationWhById = async (req, res) => {
    try {
        const locationwh = await LocationsWh.findById(req.params.id);
        if (!locationwh) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(locationwh);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ CREATE (POST)
exports.createLocationWh = async (req, res) => {
    try {
        // หา code ล่าสุด
        const lastLocationWh = await LocationsWh.findOne().sort({ code: -1 }).collation({ locale: "en_US", numericOrdering: true });
        let nextCode = 'LWH00001';
        if (lastLocationWh && lastLocationWh.code) {
            const lastNum = parseInt(lastLocationWh.code.replace('LWH', ''), 10);
            const newNum = lastNum + 1;
            nextCode = 'LWH' + newNum.toString().padStart(5, '0');
        }

        const {
            name,
            description,
        } = req.body;

        const newLocationWh = new LocationsWh({
            code: nextCode,
            name,
            description,
        });

        const saved = await newLocationWh.save();
        res.status(201).json(saved);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ UPDATE (PUT)
exports.updateLocationWh = async (req, res) => {
    try {
        const updated = await LocationsWh.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ DELETE
exports.deleteLocationWh = async (req, res) => {
    try {
        const deleted = await LocationsWh.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};