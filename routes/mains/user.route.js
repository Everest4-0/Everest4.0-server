var router = require('express').Router();
let controller = require('../../controllers/mains/user.controller');
let midlleWare = require('../../application/middlewares/main')
let UserHelper = require('../../application/mains/user.helper')
// Export API routes
module.exports = router;
router.get('/', midlleWare.validateUserAuthToken, controller.allBy);
router.get('/:id', midlleWare.validateUserAuthToken, controller.one);
router.post('/', midlleWare.validateUserAuthToken, controller.create);
router.put('/', midlleWare.validateUserAuthToken, controller.update);
router.delete('/', midlleWare.validateUserAuthToken, controller.delete);
router.post('/authenticate', controller.authenticate, UserHelper.setUserAuthToken);

// Export API routes
module.exports = router;
