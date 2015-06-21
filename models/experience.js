"use strict";

module.exports = function(sequelize, DataTypes) {
    var Experience = sequelize.define("Experience", {
        length: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Experience.belongsTo(models.Profile);
                Experience.belongsTo(models.City);
            }
        }
    });





    return Experience;
};