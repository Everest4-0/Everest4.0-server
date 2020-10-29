var router = require('express').Router();
let controller = require('../controller/user.controller');

// Export API routes
module.exports = router;
router.get('/', controller.all);

// Export API routes
module.exports = router;
