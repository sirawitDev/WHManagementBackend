const express = require('express');
const router = express.Router();
const goodIssueController = require('../../../controllers/admins/goodIssueController');

// GET
router.get('/', goodIssueController.getAllGoodIssues);
router.get('/:id', goodIssueController.getGoodIssueById);

// POST
router.post('/', goodIssueController.createGoodIssue);

// PUT
router.put('/:id', goodIssueController.updateGoodIssue);

// DELETE
router.delete('/:id', goodIssueController.deleteGoodIssue);

module.exports = router;