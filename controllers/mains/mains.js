module.exports = {
    activitySector: (req,res) => {
        const as=require('../../application/constants/consts').ActivitySectors;
        console.warn(as)
        res.json(as)
    }
}

