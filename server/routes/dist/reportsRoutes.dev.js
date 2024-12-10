"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/reportsController'),
    getBooksReport = _require.getBooksReport,
    getMoviesReport = _require.getMoviesReport,
    getMembershipsReport = _require.getMembershipsReport,
    getActiveIssuesReport = _require.getActiveIssuesReport,
    getOverdueReturnsReport = _require.getOverdueReturnsReport,
    getIssueRequestsReport = _require.getIssueRequestsReport;

router.get('/books', getBooksReport);
router.get('/movies', getMoviesReport);
router.get('/memberships', getMembershipsReport);
router.get('/active-issues', getActiveIssuesReport);
router.get('/overdue-returns', getOverdueReturnsReport);
router.get('/issue-requests', getIssueRequestsReport);
module.exports = router;