

const { Habit,Task }          = require('../models');
const authService       = require('../services/auth.service');
const { to, ReE, ReS }  = require('../services/util.service');
const moment = require('moment');

const getUserHabits = async function(req, res){


    let err, habits;
    let user_id = req.body.user_id;

    [err, habits] = await to(
        Habit.findAll({ where: { user_id:user_id},
            include: [{
        model: Task
    }] })

    );

    if (err) return ReE(res, err, 422);

    if (habits==undefined) return ReE(res, "habits not found: "+user_id, 422);

    let habit_json = [];
    for (let i in habits) {
        let habit = habits[i];
        let habit_info = habit.toWeb();
        habit_json.push(habit_info);
    }

    return ReS(res, {habits:habit_json});
}
module.exports.getUserHabits = getUserHabits;


const addHabit = async function(req, res){


    let err, habit;
    let _habit = req.body.habit;


    [err, habit] = await to(
        Habit.create(_habit)

    );

    if (err) return ReE(res, err, 422);

    return ReS(res, {habit:habit.toWeb()});
}
module.exports.addHabit = addHabit;

