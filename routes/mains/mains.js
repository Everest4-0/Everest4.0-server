var router = require('express').Router();
let { activitySector, newsCategories } = require('../../controllers/mains/mains');

router.get('/activities-sectors', activitySector);

router.get('/news-categories', newsCategories)

// Export API routes
module.exports = router;