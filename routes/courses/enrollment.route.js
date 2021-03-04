var router = require('express').Router();
let controller = require('../../controllers/courses/enrollment.controller');

let midlleWare = require('../../application/middlewares/main')
// Export API routes
module.exports = router;
router.get('/', midlleWare.validateUserAuthToken, controller.allBy);
router.get('/:id', midlleWare.validateUserAuthToken, controller.one);
router.post('/', midlleWare.validateUserAuthToken, controller.create);
router.put('/', midlleWare.validateUserAuthToken, controller.update);
router.delete('/',midlleWare.validateUserAuthToken, controller.delete);

// Export API routes
module.exports = router;
