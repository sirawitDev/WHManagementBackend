const express = require('express');
const router = express.Router();
const MaterialController = require('../../controllers/admins/materialController');

// GET
router.get('/', MaterialController.getMaterials);
router.get('/:id', MaterialController.getMaterialById);

// POST
router.post('/', MaterialController.createMaterial);

// PUT
router.put('/:id', MaterialController.updateMaterial);

// DELETE
router.delete('/:id', MaterialController.deleteMaterial);

module.exports = router;