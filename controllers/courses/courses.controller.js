var {
    Course
    , Op
    , Module
} = require('../../models/models');


exports.create = async (req, res) => {

    let course = await Course.create(req.body).catch((e, course) => {
        res.status(400).json(e || course)
    });

    res.json(course)
}

exports.update = async (req, res) => {

    await Course.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    res.json(course);
}

exports.delete = async (req, res) => {
    let course = Course.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    res.json(course);
}

exports.one = async (req, res) => {

    let course = await Course.findByPk(req.params.id, {
        include: [
            {
                model: Module,
                as: 'modules'
            }
        ]
    });
    res.json(course)
}


exports.allBy = async (req, res) => {

    let filter = {}

    if (req.query['$filter']) {
        filter = {
            [Op.or]: [
                {
                    email: { [Op.like]: '%' + req.query['$filter'].toLowerCase() + '%' }
                },
                {
                    telePhone: { [Op.like]: '%' + req.query['$filter'].toLowerCase() + '%' }
                }
            ]
        }
    }


    let courses = await Course.findAll({
        where: filter,
        include: [
            {
                model: Module,
                as: 'modules'
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(courses)
}

