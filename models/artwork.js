"use strict";

module.exports = function(sequelize, DataTypes) {
    var Artwork = sequelize.define("Artwork", {
        imageURL: DataTypes.STRING,
        qrCodeURL: DataTypes.STRING,
        likes: DataTypes.INTEGER,
        facebookShares: DataTypes.INTEGER,
        twitterShares: DataTypes.INTEGER,
        visits: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Artwork.belongsTo(models.City);
            }
        }
    });





    return Artwork;
};