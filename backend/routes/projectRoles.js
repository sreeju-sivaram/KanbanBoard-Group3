var express = require('express');
const { assignUser, getIsAdminInd,getUsersProjectRole} = require('../controllers/projectRoles');

var router = express.Router();

/* Database table Project_Roles' functions */
router.post('/', assignUser);
router.get('/:id', getIsAdminInd);
router.get('/:id/:pId', getUsersProjectRole);

module.exports = router;
