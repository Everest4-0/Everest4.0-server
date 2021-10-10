var router = require('express').Router();
let { activitySector } = require('../../controllers/mains/mains');

router.get('/activities-sectors', activitySector);

// Export API routes
module.exports = router;