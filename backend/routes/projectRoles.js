var express = require('express');
const { assignUser, getIsAdminInd,getUsersProjectRole,deleteUserFrmProject} = require('../controllers/projectRoles');

var router = express.Router();

/* Database table Project_Roles' functions */
router.post('/', assignUser);
//gets list of projects fr the usr and if they are an admin on any project
router.get('/:id', getIsAdminInd);
router.get('/:id/:pId', getUsersProjectRole);
router.delete('/:id', deleteUserFrmProject);

module.exports = router;
