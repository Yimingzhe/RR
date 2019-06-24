var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET result page. */
router.get('/result', function(req, res, next) {
  res.render('result');
});

/* GET list page. */
router.get('/list', function(req, res, next) {
  res.render('list');
});

module.exports = router;
