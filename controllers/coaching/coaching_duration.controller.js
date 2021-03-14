const Coaching_duration = require("../../models/coaching/coaching_duration");

exports.create = async(req, res) =>{

    let duration = await Coaching_duration.create(req.body).catch((e, note) =>{
        res.status(400).json(e || duration)
    });

    res.json(duration)
}

exports.update = async (req, res) =>{
    await Coaching_duration.update(req.body, {
        where:{
            id: req.body.id
        }
    })

    let duration = await Coaching_duration.findByPk(req.body.id, {
    }).catch(e =>{
        let i = e
    })
    res.json(duration);
}

exports.delete = async (req, res) =>{
    let duration = Coaching_duration.destroy({where:{id:req.params.id}})
    res.json({
        status: 200,
        message: "sucess",
        data: duration
    })
}

exports.one = async (req, res) => {

    let duration = await Note.findByPk(req.params.id, {
    });
    res.json(duration)
}

exports.allBy = async (req, res) => {

    let durations = await Note.findAll({
        where: filter,
    }).catch((e, r) => {
        let u = e
    });

    res.json(durations)
}




