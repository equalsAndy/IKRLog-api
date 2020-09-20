'use strict';

const {TE, to}          = require('../services/util.service');
const CONFIG            = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Habit', {


        habit_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description     : DataTypes.STRING,
        user_id      : DataTypes.STRING,
        label   :DataTypes.STRING,
        active :DataTypes.BOOLEAN,
        reps :DataTypes.INTEGER,
        quadrant: DataTypes.INTEGER

    }, {
        freezeTableName: true,
        timestamps: false

    });

    Model.associate = function(models){
       this.Habit = this.belongsTo(models.User,{
           foreignKey: 'user_id'
       });
        this.Day = this.hasMany(models.Task, {foreignKey:'habit_id'});
    };


    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
