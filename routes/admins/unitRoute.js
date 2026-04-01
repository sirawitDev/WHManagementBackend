const express = require('express');
const router = express.Router();
const UnitController = require('../../controllers/admins/unitController');

// GET
router.get('/', UnitController.getUnit);
router.get('/:id', UnitController.getUnitById);

// POST
router.post('/', UnitController.createUnit);

// PUT
router.put('/:id', UnitController.updateUnit);

// DELETE
router.delete('/:id', UnitController.deleteUnit);

module.exports = router;