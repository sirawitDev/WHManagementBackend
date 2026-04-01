const express = require('express');
const router = express.Router();
const BusinessPartnerController = require('../../controllers/admins/bpController');

// GET
router.get('/', BusinessPartnerController.getBusinessPartner);
router.get('/:id', BusinessPartnerController.getBusinessPartnerById);

// POST
router.post('/', BusinessPartnerController.createBusinessPartner);

// PUT
router.put('/:id', BusinessPartnerController.updateBusinessPartner);

// DELETE
router.delete('/:id', BusinessPartnerController.deleteBusinessPartner);

module.exports = router;