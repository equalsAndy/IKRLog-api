const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('../controllers/user.controller');
const DayController 	= require('../controllers/day.controller');
const TaskController 	= require('../controllers/task.controller');
const HabitController 	= require('../controllers/habit.controller');
const custom 	        = require('./../middleware/custom');
const passport      	= require('passport');
const path              = require('path');


//Disable to prevent authentication checks
//require('./../middleware/passport')(passport)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Home API", data:{"version_number":"v1.0.0"}})
});


router.post('/addUser',UserController.addUser);
router.post('/getUserById',UserController.getUserById);
router.post('/authenticate',UserController.authenticate);


router.post('/getDay',DayController.getDay);
router.post('/addHabitsToDay',DayController.addHabitsToDay);


router.post('/addTask',TaskController.addTask);
router.post('/toggleTask',TaskController.toggleTask);
router.post('/updateTask',TaskController.updateTask);
router.post('/removeTask',TaskController.removeTask);


router.post('/addHabit',HabitController.addHabit);
router.post('/getUserHabits',HabitController.getUserHabits);


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
