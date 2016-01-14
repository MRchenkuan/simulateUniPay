var express = require('express');
var router = express.Router();
"use strict";
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* GET users listing. */
router.get('/test', function(req, res,next) {
  console.log(req.query["p"]);
  res.send('respond with a resource');
});


module.exports = router;
