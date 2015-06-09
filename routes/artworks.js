var models = require('../models');
var express = require('express');
var router = express.Router();

console.log("ROUTE ARTWORKS INITIALIZED ------")


router.get('/artwork/:id', function(req, res) {
    models.Artwork.find({
        where: {
            id: req.param('id')
        }
    }).then(function(artwork) {
        res.send(artwork)
    });
});

router.get('/galleries/:idCity', function(req, res) {

    console.log(models)
    models.Artwork.findAll({
        where: {
            CityId: req.param('idCity')
        }
    }).then(function(artworks) {
        res.send(artworks)
    });
});
router.get('/galleries/:idCity/:idProfile', function(req, res) {
    models.Profile.find({
        where: {
            id: idProfile
        }
    }).then(function(profile) {
        profile.getArworks({
            where: {
                CityId: req.param('idCity')
            }
        }).then(function(artworks) {
            res.send(artworks)
        });
    })

});

router.get('/top/:positions', function(req, res) {
    models.Artwork.findAll({
        order: 'likes DESC',
        limit: req.param('positions')

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


module.exports = router;