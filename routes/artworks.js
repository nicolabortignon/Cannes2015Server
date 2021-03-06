var models = require('../models');
var express = require('express');
var router = express.Router();


models.Artwork.belongsToMany(models.Profile)
models.Profile.belongsToMany(models.Artwork)
models.Visit.belongsTo(models.Artwork);
models.CountLikes.belongsTo(models.Artwork);
router.post('/create', function(req, res) {
    models.User.create({
        username: req.param('username')
    }).then(function() {
        res.redirect('/');
    });
});

router.get('/cities/', function(req, res) {
    models.City.findAll({

    }).then(function(cityList) {
        res.send(cityList)
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
        models.Experience.create({
            ProfileId: req.param('profileId'),
            CityId: req.param('cityId')
        }).then(function(experience) {
            res.send(artworks)
        })
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

                models.Visit.create({
                    ArtworkId: artwork.id
                }).then(function(visit) {
                    res.send(visit)
                })
            });
        }
    });
});


router.get('/visits/close/:id', function(req, res) {
    models.Visit.find({
        where: {
            id: req.param('id')
        }
    }).then(function(visit) {

        if (visit) { // if the record exists in the db
            visit.updateAttributes({

            }).then(function(visit2) {
                visit2.updateAttributes({
                    length: visit2.updatedAt - visit2.createdAt
                }).then(function() {
                    res.send()
                });
            });
        }
    });
});

router.get('/visits/inTheLastSecond/:totatSecond', function(req, res) {
    var MS_PER_SECOND = 1000;
    var durationInSecond = req.param('totatSecond');


    var myStartDate = new Date(new Date() - durationInSecond * MS_PER_SECOND);

    models.Visit.findAndCountAll({
        where: {
            createdAt: {
                $gt: myStartDate
            }
        }
    }).then(function(visit) {
        var obj = {
            "count": visit.count
        }
        res.send(obj)

    });
});

router.get('/totalExperiences', function(req, res) {

    models.Experience.findAndCountAll({

    }).then(function(visit) {
        var obj = {
            "count": visit.count
        }
        res.send(obj)

    });
});

router.get('/totalVisits', function(req, res) {

    models.Visit.findAndCountAll({

    }).then(function(visit) {
        var obj = {
            "count": visit.count
        }
        res.send(obj)

    });
});

router.get('/totalLikes', function(req, res) {


    models.sequelize.query("SELECT sum(twitterShares) twitter, sum(facebookShares) facebook,sum(likes) likes, sum(googlePlusShares) googlePlus FROM Artworks", {
        type: models.sequelize.QueryTypes.SELECT
    }).then(function(rows) {

        res.send(rows)

    });
});

router.get('/randomPicture', function(req, res) {


    models.sequelize.query("SELECT * FROM Artworks INNER JOIN Cities ON CityId = Cities.id ORDER BY RAND() LIMIT 0, 1;", {
        type: models.sequelize.QueryTypes.SELECT
    }).then(function(rows) {

        res.send(rows)

    });
});


router.get('/last24Likes', function(req, res) {


    models.sequelize.query("SELECT HOUR(createdAt) AS h, COUNT( * ) count FROM CountLikes WHERE createdAt > DATE_SUB(NOW(), INTERVAL 24 HOUR) GROUP BY h;", {
        type: models.sequelize.QueryTypes.SELECT
    }).then(function(rows) {

        res.send(rows)

    });
});



router.get('/last24Visits', function(req, res) {


    models.sequelize.query("SELECT HOUR(createdAt) AS h, COUNT( * ) count FROM Visits WHERE createdAt > DATE_SUB(NOW(), INTERVAL 24 HOUR) GROUP BY h;", {
        type: models.sequelize.QueryTypes.SELECT
    }).then(function(rows) {

        res.send(rows)

    });
});






router.get('/likes/inTheLastSecond/:totatSecond', function(req, res) {
    var MS_PER_SECOND = 1000;
    var durationInSecond = req.param('totatSecond');
    var myStartDate = new Date(new Date() - durationInSecond * MS_PER_SECOND);
    models.CountLikes.findAndCountAll({
        where: {
            createdAt: {
                $gt: myStartDate
            }
        }
    }).then(function(visit) {
        var obj = {
            "count": visit.count
        }
        res.send(obj)

    });
});

router.get('/topOverAll/:positions', function(req, res) {
    models.Artwork.findAll({
        limit: req.param('positions'),
        include: models.City,

        order: [
            ['visits', 'DESC']
        ]
    }).then(function(results) {
        res.send(results)
        // We don't need spread here, since only the results will be returned for select queries
    })
});


router.get('/topPerCity/:positions/:cityId', function(req, res) {
    models.Artwork.findAll({
        limit: req.param('positions'),
        include: models.City,
        where: {
            cityId: req.param('cityId')
        },
        order: [
            ['visits', 'DESC']
        ]
    }).then(function(results) {
        res.send(results)
        // We don't need spread here, since only the results will be returned for select queries
    })
});



router.get('/CityPreferencePerProfile/', function(req, res) {
    models.sequelize.query("SELECT Count(*) as Count,ProfileId,CityId FROM Experiences Group By `ProfileId`, CityId", {
        type: models.sequelize.QueryTypes.SELECT
    }).then(function(rows) {
        var results = []

        for (var i = 0; i < 6; i++) {
            results.push({
                profileId: i,
                city: [0, 0, 0, 0, 0, 0]
            })
        }
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < 6; j++) {
                if (results[j].profileId == rows[i].ProfileId) {
                    //trovato il profilo giusto
                    results[j].city[rows[i].CityId - 1] = rows[i].Count;

                }
            }
        }
        console.log(rows)
        res.send(results)
        // We don't need spread here, since only the results will be returned for select queries
    })
});



router.get('/social/countSocial/', function(req, res) {
    models.sequelize.query("SELECT sum(twitterShares) Twitter, sum(facebookShares) Facebook, sum(googlePlusShares) GooglePlus FROM Artworks  ", {
        type: models.sequelize.QueryTypes.SELECT
    }).then(function(users) {
        res.send(users)
        // We don't need spread here, since only the results will be returned for select queries
    })
});


router.get('/experiences/byProfile/', function(req, res) {
    models.Experience.findAndCountAll({
        group: ['ProfileId'],
        include: [{
            model: models.Profile,
        }]
    }).then(function(experiences) {

        res.send(experiences)

    });
});

router.get('/experiences/byCity/', function(req, res) {
    models.Experience.findAndCountAll({
        group: ['CityId'],
        include: [{
            model: models.City,
        }]
    }).then(function(experiences) {

        res.send(experiences)

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
                models.CountLikes.create({
                    ArtworkId: artwork.id
                }).then(function(likes) {
                    res.send(artwork)
                })



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