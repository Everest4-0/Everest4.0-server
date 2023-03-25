var {
    BudgetCategory,
    Role,
    Op,
    PartialGoal,
    User,
    Goal,
    Budget
} = require('../../models/models');
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {

    let y;
    let category = await BudgetCategory.create(req.body).catch((e, category) => {
        res.status(400).json(e || category)
    });
    res.json(category)
}

exports.update = async (req, res) => {

    await BudgetCategory.update(req.body, {
        where: {
            id: req.body.id
        }
    })

    let category = await BudgetCategory.findByPk(req.body.id).catch(e => {
        let i = e
    });

    res.json(category);
}

exports.delete = async (req, res) => {
    let category = BudgetCategory.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json(category)
}

exports.one = async (req, res) => {

    let category = await BudgetCategory.findByPk(req.params.id, {
        include: [{
            model: Budget,
            as: 'budgets'
        }]
    });
    res.json(category)
}

exports.allBy = async (req, res) => {

    let filter = req.query

    const where = filter,
        include = [
            {
                model: Budget,
                as: 'budgets'
            }
        ]

    const categories = await paginate({
        Model: BudgetCategory,
        where,
        include,
        ...req.query
    })

    res.json(categories)
}