

const { Task }          = require('../models');
const authService       = require('../services/auth.service');
const { to, ReE, ReS }  = require('../services/util.service');


const addTask = async function(req, res){


    let err, task;
    let _task = req.body.task;


    [err, task] = await to(
        Task.create(_task)

    );

    if (err) return ReE(res, err, 422);

    return ReS(res, {task:task.toWeb()});
}
module.exports.addTask = addTask;

const toggleTask = async function(req, res){


    let err, task;
    let task_id = req.body.task_id;


    [err, task] = await to(
        Task.findByPk(task_id)

    );

    if (err) return ReE(res, err, 422);

    task.done= !task.done;


    [err, task] = await to(
        task.save()

    );

    if (err) return ReE(res, err, 422);

    return ReS(res, {task:task.toWeb()});
}
module.exports.toggleTask = toggleTask;


const updateTask = async function(req, res){


    let err, task;
    let uptask = req.body.task;
    let task_id = uptask.task_id;


    [err, task] = await to(
        Task.findByPk(task_id)

    );



    if (err) return ReE(res, err, 422);

    task.task_text = uptask.task_text;
    task.notes = uptask.notes;
    task.quadrant = uptask.quadrant;


    [err, task] = await to(
        task.save()

    );

    if (err) return ReE(res, err, 422);

    return ReS(res, {task:task.toWeb()});
}
module.exports.updateTask = updateTask;

const removeTask = async function(req, res){


    let     err, task;
    let task_id = req.body.task_id;


    [err, task] = await to(
        Task.destroy(    {
        where: {
            task_id: task_id
        }
    })

    );

    if (err) return ReE(res, err, 422);

    return ReS(res, {});
}
module.exports.removeTask = removeTask;
