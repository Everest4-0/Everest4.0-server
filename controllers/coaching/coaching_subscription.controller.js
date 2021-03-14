var {CoachingSubscription, CoachingGoal, CoachingDuration} = require("../../models/models")

exports.create = async(req, res) =>{

    req.body.userId = req.body.user.id
    let coaching_subscription = await CoachingSubscription.create(req.body).catch((e, coaching_subscription) =>{
        res.status(400).json(e || coaching_subscription)
    });

    res.json(coaching_subscription)
}

exports.update = async (req, res) =>{
    await CoachingSubscription.update(req.body, {
        where:{
            id: req.body.id
        }
        
    })

    let coaching_subscription = await CoachingSubscription.findByPk(req.body.id, {
    }).catch(e =>{
        let i = e
    })
    res.json(coaching_subscription);
}

exports.delete = async (req, res) =>{
    let coaching_subscription = await CoachingSubscription.destroy({where:{id:req.params.id}})
    res.json({
        status: 200,
        message: "sucess",
        data: coaching_subscription
    })
}

exports.one = async (req, res) => {

    let coaching_subscription = await CoachingSubscription.findByPk(req.params.id, {
    });
    res.json(coaching_subscription)
}

exports.allBy = async (req, res) => {

    let coaching_subscriptions = await CoachingSubscription.findAll({
        where: filter,
    }).catch((e, r) => {
        let u = e
    });

    res.json(coaching_subscriptions)
}