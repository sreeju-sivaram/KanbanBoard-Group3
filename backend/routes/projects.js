var express = require('express');
const { getAllProjects, addNewProject,getExistingUsersForProject } = require('../controllers/projects');

var router = express.Router();

/* Database table Projects' functions */
router.get('/', getAllProjects);
router.post('/', addNewProject);
router.get('/:id',getExistingUsersForProject)

module.exports = router;
