var router = require('express').Router();
let controller = require('../../controllers/mains/user.controller');

// Export API routes
module.exports = router;
router.get('/', controller.allBy);
router.get('/:id', controller.one);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);
router.post('/authenticate', controller.authenticate);

// Export API routes
module.exports = router;
