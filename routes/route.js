var router = require('express').Router();

//users route
router.use('/users', require('../routes/user.route'));
router.use('/roles', require('../routes/role.route'));
router.use('/acls', require('../routes/acl.route'));
router.use('/evaluations', require('./evaluation.route'));
router.use('/user-evaluations', require('./user-evaluation.route'));

// Export API routes
module.exports = router;