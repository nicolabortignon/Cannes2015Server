"use strict";

module.exports = function(sequelize, DataTypes) {
    var CountLikes = sequelize.define("CountLikes", {
        length: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                CountLikes.belongsTo(models.Artwork);
            }
        }
    });

    return CountLikes;
};