const express = require('express');
const router = express.Router();
const checkerGoodIssueController = require('../../../controllers/checker/checkerGoodIssueController');

// GET
router.get('/', checkerGoodIssueController.getAllGoodIssues);
router.get('/:id', checkerGoodIssueController.getGoodIssueById);

// POST
router.post('/', checkerGoodIssueController.createGoodIssue);

// PUT
router.put('/:id', checkerGoodIssueController.updateGoodIssue);

// DELETE
router.delete('/:id', checkerGoodIssueController.deleteGoodIssue);

module.exports = router;