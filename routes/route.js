var router = require('express').Router();

//users route
router.use('/news', require('../routes/news.route'));

router.use('/users', require('../routes/user.route'));
router.use('/roles', require('../routes/role.route'));
router.use('/acls', require('../routes/acl.route'));
router.use('/evaluations', require('./evaluation.route'));
router.use('/evaluation-requests', require('./evaluation-request.route'));
router.use('/user-evaluations', require('./user-evaluation.route'));

//Goal
router.use('/goals', require('./goals/goal.route'));
router.use('/tasks', require('./goals/task.route'));
router.use('/budgets', require('./goals/budget.route'));
router.use('/todos', require('./goals/todo.route'));

// Export API routes
module.exports = router;