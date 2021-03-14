const Coaching_goal = require("../../models/coaching/coaching_coaching_goal")

exports.create = async(req, res) =>{

    let coaching_goal = await Coaching_goal.create(req.body).catch((e, note) =>{
        res.status(400).json(e || coaching_goal)
    });

    res.json(coaching_goal)
}

exports.update = async (req, res) =>{
    await Coaching_goal.update(req.body, {
        where:{
            id: req.body.id
        }
    })

    let coaching_goal = await Coaching_goal.findByPk(req.body.id, {
    }).catch(e =>{
        let i = e
    })
    res.json(coaching_goal);
}

exports.delete = async (req, res) =>{
    let coaching_goal = Coaching_goal.destroy({where:{id:req.params.id}})
    res.json({
        status: 200,
        message: "sucess",
        data: coaching_goal
    })
}

exports.one = async (req, res) => {

    let coaching_goal = await Coaching_goal.findByPk(req.params.id, {
    });
    res.json(coaching_goal)
}

exports.allBy = async (req, res) => {

    let coaching_goals = await Coaching_goal.findAll({
        where: filter,
    }).catch((e, r) => {
        let u = e
    });

    res.json(coaching_goals)
}