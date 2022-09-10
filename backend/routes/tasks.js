var express = require('express');
const { getAllTasks, addNewTask, deleteTask, updateTask } = require('../controllers/tasks');

var router = express.Router();

/* Fetch all tasks from database */
router.get('/:id', getAllTasks);
/* Add new task to database */
router.post('/', addNewTask);
/* Delete task from database */
router.delete('/:id', deleteTask);
/* Update task in database */
router.put('/:id', updateTask);

module.exports = router;
