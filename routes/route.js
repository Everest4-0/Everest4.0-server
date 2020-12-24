var router = require('express').Router();

router.use('/datas', require('./datas/data.route'));
//Mains
router.use('/news', require('./mains/news.route'));
router.use('/users', require('./mains/user.route'));
router.use('/roles', require('./mains/role.route'));
router.use('/acls', require('./mains/acl.route'));

//Diagnostics
router.use('/evaluations', require('./diagnostics/evaluation.route'));
router.use('/evaluation-requests', require('./diagnostics/evaluation-request.route'));
router.use('/user-evaluations', require('./diagnostics/user-evaluation.route'));

//Goal
router.use('/goals', require('./goals/goal.route'));
router.use('/tasks', require('./goals/task.route'));
router.use('/budgets', require('./goals/budget.route'));
router.use('/budget-categories', require('./goals/budget-category.route'));
router.use('/todos', require('./goals/todo.route'));

//User quiz
router.use('/quizes', require("./quiz/quiz.route"));
router.use('/answers', require("./quiz/answer.route"));

//User quiz
router.use('/courses/courses', require("./courses/course.route"));
router.use('/courses/enrollments', require("./courses/enrollment.route"));
router.use('/courses/activities', require("./courses/activity.route"));
//router.use('/answers', require("./quiz/answer.route"));

// Export API routes
module.exports = router;