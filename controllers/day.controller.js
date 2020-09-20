const {Day, Task, Habit} = require('../models');
const authService = require('../services/auth.service');
const {to, ReE, ReS} = require('../services/util.service');
const moment = require('moment');

const getDay = async function (req, res) {


    let err, day;
    let dayDate = req.body.date;
    let user_id = req.body.user_id;

    let dd = moment(dayDate + "T00:00:00Z").toISOString();

    [err, day] = await to(
        Day.findOrCreate({
            where: {date: dd, user_id: user_id},
            include: [{
                model: Task
            }]
        })
    );

    if (err) return ReE(res, err, 422);

    let theDay = day[0].toWeb();


    if (day == undefined) return ReE(res, "day not found: " + dayDate, 422);

    return ReS(res, {day: theDay});
}
module.exports.getDay = getDay;


const addHabitsToDay = async function (req, res) {


    let err, day, habits;
    let dayId = req.body.day_id;


    [err, day] = await to(
        Day.findByPk(dayId, {
            include: [{
                model: Task
            }]
        })
    );

    if (err) return ReE(res, err, 422);
    if (day == undefined) return ReE(res, "day not found: " + dayDate, 422);

    let theDay = day.toWeb();
    let user_id = theDay.user_id;


    [err, habits] = await to(
        Habit.findAll({where: {user_id: user_id, active: 1}}));

    if (err) return ReE(res, err, 422);

    if (habits == undefined || habits.length === 0) ReS(res, {"err":"no habits found"});

    // for each habit create a task for this day
    for (let habit of habits) {
        let newTask = {
            "task_text": habit.label,
            "done": false,
            "notes": habit.description,
            "quadrant": habit.quadrant,
            "day_id": dayId,
            "habit_id": habit.habit_id
        }

        let task;

        for (let i = 0; i < habit.reps;i++) {
            [err, task] = await to(
                Task.create(newTask)
            );
        }
        if (err) return ReE(res, err, 422);

    }


    return ReS(res, {});
}
module.exports.addHabitsToDay = addHabitsToDay;

