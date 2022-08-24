var express = require('express');
const userRoutes = require('./users')
const taskRoutes = require('./tasks')
const statusesRoutes = require('./statuses')
const login = require('./login')
const register = require('./register')

var router = express.Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/statuses", statusesRoutes);
router.use("/login", login);
router.use("/register", register);

module.exports = router;
