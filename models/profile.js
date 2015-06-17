"use strict";

module.exports = function(sequelize, DataTypes) {
    var Profile = sequelize.define("Profile", {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Profile.hasMany(models.Artwork, {
                    through: 'ArtworksProfiles',
                    foreignKey: 'ProfileId'
                });

            }
        }
    });


    /* INITIALIZE OBJECTS IN DATABASE */

    return Profile;
};