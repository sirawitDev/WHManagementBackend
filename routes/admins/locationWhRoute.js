const express = require('express');
const router = express.Router();
const LocationWhController = require('../../controllers/admins/locationWhController');

// GET
router.get('/', LocationWhController.getLocationWh);
router.get('/:id', LocationWhController.getLocationWhById);

// POST
router.post('/', LocationWhController.createLocationWh);

// PUT
router.put('/:id', LocationWhController.updateLocationWh);

// DELETE
router.delete('/:id', LocationWhController.deleteLocationWh);

module.exports = router;