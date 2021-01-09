var router = require('express').Router();
let controller = require('../../controllers/courses/activity.controller');

// Export API routes
module.exports = router;
router.get('/', controller.allBy);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);
router.post('/add_user_answer', controller.addUserAnswer);
router.get('/user_answer', controller.getUserAnswer);
router.get('/:id', controller.one);

// Export API routes
module.exports = router;
