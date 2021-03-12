var router = require('express').Router();
const Main = require('../../application/middlewares/main');
let controller = require('../../controllers/coaching/note.controller');

// Export API routes
module.exports = router;
router.get('/', Main.validateUserAuthToken , controller.allBy);
router.get('/:id', controller.one);
router.post('/',Main.validateUserAuthToken , controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);

// Export API routes
module.exports = router;
