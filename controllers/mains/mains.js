module.exports = {

    activitySector: (req,res) => {
        const activitySectors = require('../../application/constants/consts').ActivitySectors;
        res.json(activitySectors)
    },
    newsCategories: (req, res) =>{
        const newsCategories = require('../../application/constants/consts').NewsCategories;
        res.json(newsCategories)
    }

}

