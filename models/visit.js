"use strict";

module.exports = function(sequelize, DataTypes) {
    var Visit = sequelize.define("Visit", {

    }, {
        classMethods: {
            associate: function(models) {
                Visit.belongsTo(models.Artwork);
            }
        }
    });





    return Visit;
};