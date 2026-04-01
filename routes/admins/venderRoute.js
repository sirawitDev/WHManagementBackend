const express = require('express');
const router = express.Router();
const VendorController = require('../../controllers/admins/vendorController');

// GET
router.get('/', VendorController.getVenders);
router.get('/:id', VendorController.getVenderById);

// POST
router.post('/', VendorController.createVender);

// PUT
router.put('/:id', VendorController.updateVender);

// DELETE
router.delete('/:id', VendorController.deleteVender);

module.exports = router;