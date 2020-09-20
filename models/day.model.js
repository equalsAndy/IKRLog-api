'use strict';

const {TE, to}          = require('../services/util.service');
const CONFIG            = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Day', {


        day_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date     : DataTypes.DATE,
        user_id      : DataTypes.STRING,

    }, {
        freezeTableName: true,
        timestamps: false

    });

    Model.associate = function(models){
       this.Day = this.belongsTo(models.User,{
           foreignKey: 'user_id'
       });
        this.Day = this.hasMany(models.Task, {foreignKey:'day_id'});
    };


    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
