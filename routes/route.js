var router = require('express').Router();

router.use('/datas', require('./datas/data.route'));
//Mains
router.use('/news', require('./mains/news.route'));
router.use('/users', require('./mains/user.route'));
router.use('/roles', require('./mains/role.route'));
router.use('/acls', require('./mains/acl.route'));
router.use('/chats', require('./mains/chat.route'));
router.use('/chats/messages', require('./mains/chat_message.route'));

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
router.use('/courses/modules', require("./courses/module.route"));

//Coaching
router.use('/coaching/notes', require("./coaching/note.route"));
router.use('/coaching/subscriptions', require("./coaching/coaching_subscription.route"));
router.use('/coaching/durations', require("./coaching/coaching_duration.route"));
router.use('/coaching/goals', require("./coaching/coaching_goal.route"));
router.use('/coaching/feedbacks', require("./coaching/feedback.route"));
router.use('/coaching/feedback_items', require("./coaching/feedback_item.route"));
router.use('/coaching/feedback_comments', require("./coaching/feedback_comment.route"));
//router.use('/answers', require("./quiz/answer.route"));

// Export API routes
module.exports = router;