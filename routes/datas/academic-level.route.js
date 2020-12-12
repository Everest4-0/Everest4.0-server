var router = require('express').Router();
let controller = require('../../controllers/datas/academic-level.controller');

// Export API routes
module.exports = router;
router.get('/', controller.allBy);
router.get('/:id', controller.one);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);

// Export API routes
module.exports = router;
