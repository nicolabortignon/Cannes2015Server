var models = require('../models');
var express = require('express');
var router = express.Router();


models.Artwork.belongsToMany(models.Profile)
models.Profile.belongsToMany(models.Artwork)
router.post('/create', function(req, res) {
    models.User.create({
        username: req.param('username')
    }).then(function() {
        res.redirect('/');
    });
});

router.get('/artwork/:id', function(req, res) {
    models.Artwork.find({
        where: {
            id: req.param('id')
        }
    }).then(function(artwork) {
        res.send(artwork)
    });
});

router.get('/galleries/:cityId', function(req, res) {
    models.Artwork.findAll({
        where: {
            CityId: req.param('cityId')
        }
    }).then(function(artwork) {
        res.send(artwork)
    });
});






router.get('/galleries/:cityId/:profileId', function(req, res) {
    console.log("GALLERY VIA PROFILE")


    models.Artwork.findAll({
        where: {
            cityId: req.param('cityId')
        },
        include: [{
            model: models.Profile,
            where: {
                id: req.param('profileId')
            }
        }]
    }).then(function(artworks) {
        res.send(artworks)
    });


});



router.post('/:user_id/tasks/create', function(req, res) {
    models.User.find({
        where: {
            id: req.param('user_id')
        }
    }).then(function(user) {
        models.Task.create({
            title: req.param('title')
        }).then(function(title) {
            title.setUser(user).then(function() {
                res.redirect('/');
            });
        });
    });
});

router.get('/:user_id/tasks/:task_id/destroy', function(req, res) {
    models.User.find({
        where: {
            id: req.param('user_id')
        }
    }).then(function(user) {
        models.Task.find({
            where: {
                id: req.param('task_id')
            }
        }).then(function(task) {
            task.setUser(null).then(function() {
                task.destroy().then(function() {
                    res.redirect('/');
                });
            });
        });
    });
});


/* SHARE COUNTER */

router.get('/visits/:artworkId', function(req, res) {
    models.Artwork.find({
        where: {
            id: req.param('artworkId')
        }
    }).then(function(artwork) {

        if (artwork) { // if the record exists in the db
            artwork.updateAttributes({
                visits: artwork.visits + 1
            }).then(function(artwork) {
                res.send(artwork)
            });
        }
    });
});
router.get('/likes/:artworkId', function(req, res) {
    models.Artwork.find({
        where: {
            id: req.param('artworkId')
        }
    }).then(function(artwork) {

        if (artwork) { // if the record exists in the db
            artwork.updateAttributes({
                likes: artwork.likes + 1
            }).then(function(artwork) {
                res.send(artwork)
            });
        }
    });
});



// artworks/updateShareCounter/facebook/0001

router.get('/updateShareCounter/facebook/:artworkId', function(req, res) {
    models.Artwork.find({
        where: {
            id: req.param('artworkId')
        }
    }).then(function(artwork) {

        if (artwork) { // if the record exists in the db
            artwork.updateAttributes({
                facebookShares: artwork.facebookShares + 1
            }).then(function(artwork) {
                res.send(artwork)
            });
        }
    });
});
router.get('/updateShareCounter/twitter/:artworkId', function(req, res) {
    models.Artwork.find({
        where: {
            id: req.param('artworkId')
        }
    }).then(function(artwork) {

        if (artwork) { // if the record exists in the db
            artwork.updateAttributes({
                twitterShares: artwork.twitterShares + 1
            }).then(function(artwork) {
                res.send(artwork)
            });
        }
    });
});
router.get('/updateShareCounter/googleplus/:artworkId', function(req, res) {
    models.Artwork.find({
        where: {
            id: req.param('artworkId')
        }
    }).then(function(artwork) {

        if (artwork) { // if the record exists in the db
            artwork.updateAttributes({
                googlePlusShares: artwork.googlePlusShares + 1
            }).then(function(artwork) {
                res.send(artwork)
            });
        }
    });
});


module.exports = router;