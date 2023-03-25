var {CoachingGoal} = require("../../models/models");
const { paginate } = require("../global/paginator/paginator.controller");

exports.create = async(req, res) =>{

    let coaching_goal = await CoachingGoal.create(req.body).catch((e, coaching_goal) =>{
        res.status(400).json(e || coaching_goal)
    });

    res.json(coaching_goal)
}

exports.update = async (req, res) =>{
    await CoachingGoal.update(req.body, {
        where:{
            id: req.body.id
        }
    })

    let coaching_goal = await CoachingGoal.findByPk(req.body.id, {
    }).catch(e =>{
        let i = e
    })
    res.json(coaching_goal);
}

exports.delete = async (req, res) =>{
    let coaching_goal = await CoachingGoal.destroy({where:{id:req.params.id}})
    res.json({
        status: 200,
        message: "sucess",
        data: coaching_goal
    })
}

exports.one = async (req, res) => {

    let coaching_goal = await CoachingGoal.findByPk(req.params.id, {
    });
    res.json(coaching_goal)
}

exports.allBy = async (req, res) => {

    const coaching_goals = await paginate({
        Model: CoachingGoal,
        ...req.query
    })

    res.json(coaching_goals)
}