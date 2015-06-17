"use strict";

module.exports = function(sequelize, DataTypes) {
    var Artwork = sequelize.define("Artwork", {
        imageURL: DataTypes.STRING,
        qrCodeURL: DataTypes.STRING,
        likes: DataTypes.INTEGER,
        facebookShares: DataTypes.INTEGER,
        twitterShares: DataTypes.INTEGER,
        visits: DataTypes.INTEGER,
        width: DataTypes.INTEGER,
        height: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Artwork.belongsTo(models.City);
                Artwork.hasMany(models.Profile, {
                    through: 'ArtworksProfiles',
                    foreignKey: 'ArtworkId'
                });

            }
        }
    });





    return Artwork;
};