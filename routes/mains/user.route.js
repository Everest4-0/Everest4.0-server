var router = require('express').Router();
var {asyncHandler} = require('../route')
let controller = require('../../controllers/mains/user.controller');
let UserHelper = require('../../application/mains/user.helper');

let upload = require('../../application/upload/upload')

// Export API routes
module.exports = router;
router.get('/',  controller.allBy);
router.get('/:id',  controller.one);

router.post('/',  asyncHandler(controller.create));
router.put('/', upload.type("avatars").single("photoUrl"), controller.update);

router.delete('/',  controller.delete);
router.post('/signon',  asyncHandler(controller.create), UserHelper.setUserAuthToken);
router.post('/authenticate', asyncHandler(controller.authenticate), UserHelper.setUserAuthToken);

// Export API routes
module.exports = router;
