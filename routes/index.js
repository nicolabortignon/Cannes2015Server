var models  = require('../models');
var express = require('express');
<<<<<<< HEAD
var router = express.Router();
var fs = require('fs');
var http = require('http');
var url = require('url');
=======
var router  = express.Router();
>>>>>>> parent of 5ff435d... Create models for Artworks and Cities

router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.render('index', {
      title: 'Express',
      users: users
    });
  });
});

<<<<<<< HEAD
router.get('/images/:imageURL', function(req, res) {
    var file = 'images/' + req.param('imageURL');
    fs.stat(file, function(err, stat) {
        var img = fs.readFileSync(file);
        res.contentType = 'image/png';
        res.contentLength = stat.size;
        res.end(img, 'binary');
    });
});


module.exports = router;
=======
module.exports = router;
>>>>>>> parent of 5ff435d... Create models for Artworks and Cities
