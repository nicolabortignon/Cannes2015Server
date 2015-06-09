"use strict";

module.exports = function(sequelize, DataTypes) {

    var Artwork = sequelize.define('Artwork', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        imageURL: DataTypes.STRING,
    });


    return Artwork;
};