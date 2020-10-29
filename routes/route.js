var router = require('express').Router();

//let task = ;

router.use('/users', require('../routes/user.route'));

// Export API routes
module.exports = router;