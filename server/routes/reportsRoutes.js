const express = require('express');
const router = express.Router();
const {
    getBooksReport,
    getMoviesReport,
    getMembershipsReport,
    getActiveIssuesReport,
    getOverdueReturnsReport,
    getIssueRequestsReport
} = require('../controllers/reportsController');

router.get('/books', getBooksReport);
router.get('/movies', getMoviesReport);
router.get('/memberships', getMembershipsReport);
router.get('/active-issues', getActiveIssuesReport);
router.get('/overdue-returns', getOverdueReturnsReport);
router.get('/issue-requests', getIssueRequestsReport);

module.exports = router;
