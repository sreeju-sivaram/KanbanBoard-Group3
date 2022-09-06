var express = require('express');
const { getAllTasks, addNewTask, deleteTask, updateTask } = require('../controllers/tasks');

var router = express.Router();

/* Fetch all tasks from database */
router.get('/:id', getAllTasks);
router.post('/', addNewTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

module.exports = router;
