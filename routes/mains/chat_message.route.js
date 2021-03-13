var router = require('express').Router();
let controller = require('../../controllers/mains/chat_message.controller');

let midlleWare = require('../../application/middlewares/main');

// Export API routes
module.exports = router;
router.get('/', controller.allBy);
router.get('/:id', controller.one);
router.post('/',midlleWare.validateUserAuthToken, controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);

// Export API routes
module.exports = router;
