const Material = require('../../models/materialModal');

// GET ALL
exports.getMaterials = async (req, res) => {
    try {
        const materials = await Material.find();
        res.status(200).json(materials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET BY ID
exports.getMaterialById = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ message: 'Material not found' });
        }
        res.status(200).json(material);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE (POST)
exports.createMaterial = async (req, res) => {
    try {
        // หา code ล่าสุด
        // const lastMaterial = await Material.findOne().sort({ code: -1 }).collation({ locale: "en_US", numericOrdering: true });
        // let nextCode = 'MA0001';
        // if (lastMaterial && lastMaterial.code) {
        //     const lastNum = parseInt(lastMaterial.code.replace('MA', ''), 10);
        //     const newNum = lastNum + 1;
        //     nextCode = 'MA' + newNum.toString().padStart(4, '0');
        // }

        // แยก req.body ทีละตัว
        const {
            code,
            categoryId,
            unitId,
            productName,
            ownerName,
            receivedAt,
            quantity,
            warehouseLocation,
            createdBy
        } = req.body;

        const newMaterial = new Material({
            // code: nextCode,
            code,
            categoryId,
            unitId,
            productName,
            ownerName,
            receivedAt,
            quantity,
            warehouseLocation,
            createdBy
        });

        const saved = await newMaterial.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE (PUT)
exports.updateMaterial = async (req, res) => {
    try {
        const updated = await Material.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Material not found' });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE
exports.deleteMaterial = async (req, res) => {
    try {
        const deleted = await Material.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Material not found' });
        }
        res.status(200).json({ message: 'Material deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};