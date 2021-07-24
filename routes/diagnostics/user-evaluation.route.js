var router = require('express').Router();
let controller = require('../../controllers/diagnostics/user-evaluation.controller');

// Export API routes
module.exports = router;
router.get('/', controller.allBy);
router.get('/:id', controller.one);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);
//deleteby
router.post('/delete/by', controller.delete);

// Export API routes
module.exports = router;
