'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const {TE, to}          = require('../services/util.service');
const CONFIG            = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('User', {

        user_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },

        first     : DataTypes.STRING,
        last      : DataTypes.STRING,
        password  : DataTypes.STRING,
        username  : DataTypes.STRING,

        q1Name  : DataTypes.STRING,
        q2Name  : DataTypes.STRING,
        q3Name  : DataTypes.STRING,
        q4Name  : DataTypes.STRING
    }, {
        freezeTableName: true,
        timestamps: false

    });

    Model.associate = function(models){
       //this.User = this.hasMany(models.Day, {through: 'UserCompany'});
       this.User = this.hasMany(models.Day, {
           foreignKey: 'user_id'
       });
    };


    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
