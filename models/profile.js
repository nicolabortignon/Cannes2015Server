"use strict";

module.exports = function(sequelize, DataTypes) {
    var Profile = sequelize.define("Profile", {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {


            }
        }
    });


    /* INITIALIZE OBJECTS IN DATABASE */

    return Profile;
};