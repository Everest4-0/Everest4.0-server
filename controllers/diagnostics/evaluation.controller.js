var {Evaluation} = require('../../models/models');

exports.create = async (req, res) => {
    let evaluations = await Evaluation.create(req.body);
    res.json({
        status: 200,
        message: "success",
        data: evaluations
    })
}

exports.update = async (req, res) => {

    let evaluation = Evaluation.update(req.body, {
        where: {
            id:req.body.id
        }
    });
    res.json( evaluation );
}

exports.delete = async (req, res) => {
    let evaluations = Evaluation.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: evaluations
    });
}

exports.one = async (req, res) => {

    let evaluations = await Evaluation.findByPk(req.params.id);
    res.json(evaluations)

}

exports.allBy = async (req, res) => {

    let t;
    /* Evaluation.consts.forEach(async element => {
      t=   await Evaluation.create(element).catch(e=>{
        let i=e;
    })
     });*/
    let evaluations = await Evaluation.findAll({where:{
        isActive:true
    }})

    
    res.json(evaluations)
}