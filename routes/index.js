var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    models.Artwork.findAll({
        include: models.City
    }).then(function(artworks) {
        res.send(artworks);

    });
});

module.exports = router;