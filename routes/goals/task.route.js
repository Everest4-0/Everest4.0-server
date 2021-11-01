var router = require('express').Router();
let controller = require('../../controllers/goals/task.controller');

// Export API routes
router.get('/', controller.allBy);
router.get('/:id', controller.one);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.delete);

// Export API routes
module.exports = router;
