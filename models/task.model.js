'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const {TE, to}          = require('../services/util.service');
const CONFIG            = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Task', {

        task_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        task_text     : DataTypes.STRING,
        done      : {type:DataTypes.BOOLEAN,  defaultValue: false },
        notes  : DataTypes.STRING,
        quadrant:DataTypes.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false

    });

    Model.associate = function(models){
        this.Task = this.belongsTo(models.Day, {foreignKey:'day_id'});
        this.Task = this.belongsTo(models.Habit, {foreignKey:'habit_id'});
    };


    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
