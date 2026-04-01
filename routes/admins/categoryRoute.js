const express = require('express');
const router = express.Router();
const CategoryController = require('../../controllers/admins/categoryController');

// GET
router.get('/', CategoryController.getCategory);
router.get('/:id', CategoryController.getCategoryById);

// POST
router.post('/', CategoryController.createCategory);

// PUT
router.put('/:id', CategoryController.updateCategory);

// DELETE
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;