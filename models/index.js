"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
exports.sequelize = function() {
    return sequelizeObject;
};




var City = sequelize.define('City', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
});
exports.City = City;


var Artwork = sequelize.define('Artwork', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    imageURL: Sequelize.STRING,
    qrCodeURL: Sequelize.STRING,
    likes: Sequelize.INTEGER,
    facebookShares: Sequelize.INTEGER,
    twitterShares: Sequelize.INTEGER,
    visits: Sequelize.INTEGER
});
exports.Artwork = Artwork;


var Profile = sequelize.define('Profile', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
});
exports.Profile = Profile;

Artwork.hasMany(Profile);
Profile.hasMany(Artwork)
City.hasMany(Artwork);
exports.Artwork = Artwork;