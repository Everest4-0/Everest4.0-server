var router = require('express').Router();
let controller = require('../../controllers/diagnostics/user-evaluation.controller');
const { asyncHandler } = require('../route');

// Export API routes
module.exports = router;
router.get('/',    asyncHandler(controller.allBy));
router.get('/:id', asyncHandler(controller.one));
router.post('/',   asyncHandler(controller.create));
router.put('/',    asyncHandler(controller.update));
router.delete('/', asyncHandler(controller.delete));
//deleteby
router.post('/delete/by', controller.delete);

// Export API routes
module.exports = router;
