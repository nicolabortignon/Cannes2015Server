var models = require('../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');
var url = require('url');

router.get('/', function(req, res) {
    models.Artwork.findAll({
        include: models.City
    }).then(function(artworks) {
        res.send(artworks);

    });
});

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