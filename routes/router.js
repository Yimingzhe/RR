var express = require('express');
var router = express.Router();
var query = require('myLibs/mysql');
var result = require('../controllers/result');
var list = require('../controllers/list');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET result page. */
router.get('/result', function(req, res, next) {
    // show the photos of celebrity
    result.search(req, res, next);
});

router.get('/result', function(req, res) {
    // show the corresponding images
    result.show(req, res);
});

/* POST result page. */
router.post('/result', function(req, res, next) {
    result.update(req, res, next);
});

/* GET list page. */
router.get('/list', function(req, res) {
    list.show(req, res);
});

module.exports = router;
