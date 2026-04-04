const express = require('express');
const router = express.Router();
const stockreportController = require('../../../controllers/admins/stockreportController');

router.get('/', stockreportController.getStockReports);


module.exports = router;