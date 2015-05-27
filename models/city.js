"use strict";

module.exports = function(sequelize, DataTypes) {
    var City = sequelize.define("City", {
        name: DataTypes.STRING
    }, {

    });

    /* INITIALIZE OBJECTS IN DATABASE */

    return City;
};