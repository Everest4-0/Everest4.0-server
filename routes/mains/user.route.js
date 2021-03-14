var router = require('express').Router();
let controller = require('../../controllers/mains/user.controller');
let UserHelper = require('../../application/mains/user.helper')
// Export API routes
module.exports = router;
router.get('/',  controller.allBy);
router.get('/:id',  controller.one);
router.post('/',  controller.create);
router.put('/',  controller.update);
router.delete('/',  controller.delete);
router.post('/authenticate', controller.authenticate, UserHelper.setUserAuthToken);

// Export API routes
module.exports = router;
