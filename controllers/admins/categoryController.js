const Category = require('../../models/admins/categories/categoryModal');

// ✅ GET ALL
exports.getCategory = async (req, res) => {
    try {
        const units = await Category.find();
        res.status(200).json(units);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ GET BY ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ CREATE (POST)
exports.createCategory = async (req, res) => {
    try {
        // หา code ล่าสุด
        const lastCategory = await Category.findOne().sort({ code: -1 }).collation({ locale: "en_US", numericOrdering: true });
        let nextCode = 'CA0001';
        if (lastCategory && lastCategory.code) {
            const lastNum = parseInt(lastCategory.code.replace('CA', ''), 10);
            const newNum = lastNum + 1;
            nextCode = 'CA' + newNum.toString().padStart(4, '0');
        }

        const {
            name,
            description,
        } = req.body;

        const newCategory = new Category({
            code: nextCode,
            name,
            description,
        });

        const saved = await newCategory.save();
        res.status(201).json(saved);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ UPDATE (PUT)
exports.updateCategory = async (req, res) => {
    try {
        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ DELETE
exports.deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};