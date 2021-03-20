var { User, Note } = require('../../models/models');

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.user.id
    req.body.subscriptionId = req.body.subscription.id
    let note = await Note.create(req.body).catch((e, note) => {
        res.status(400).json(e || note)
    });
    res.json(note)
}

exports.update = async (req, res) => {
    
    await Note.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    let note = await Note.findByPk(req.body.id, {
    }).catch(e => {
        let i = e
    });
    res.json(note);
}

exports.delete = async (req, res) => {
    let note = Note.destroy({ where: { id: req.params.id } })
    res.json({
        status: 200,
        message: "sucess",
        data: note
    });
}

exports.one = async (req, res) => {

    let note = await Note.findByPk(req.params.id, {
        include: [
            {
                model: Quiz,
                as: 'quiz'
            }
        ]
    });
    res.json(note)
}

exports.allBy = async (req, res) => {

    let filter = {...req.query,...{ userId: req.user.id }}

    let users = await Note.findAll({
        where: filter,
        include: [
            {
                model: User,
                as: 'user'
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(users)
}