var router = require('express').Router();

router.use('/academic-levels', require('./academic-level.route'));
router.use('/professional-experiences', require('./professional-experience.route'));
router.use('/work-situations', require('./work-situation.route'));

// Export API routes
module.exports = router;