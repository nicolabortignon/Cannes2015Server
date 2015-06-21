"use strict";

module.exports = function(sequelize, DataTypes) {
    var Artwork = sequelize.define("Artwork", {
        imageURL: DataTypes.STRING,
        shortURL: DataTypes.STRING,
        qrCodeURL: DataTypes.STRING,
        likes: DataTypes.INTEGER,
        facebookShares: DataTypes.INTEGER,
        googlePlusShares: DataTypes.INTEGER,
        twitterShares: DataTypes.INTEGER,
        visits: DataTypes.INTEGER,
        width: DataTypes.INTEGER,
        height: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Artwork.belongsTo(models.City);
            }
        }
    });
    return Artwork;
};