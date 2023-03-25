var { Role } = require('../../models/models');
const request = require('request');
const axios = require('axios');
const NewsApi = require('../../application/news/newsapi');
exports.create = async (req, res) => {
    let role = await Role.create(req.body);
    res.json({
        status: 200,
        message: "success",
        data: role
    })
}

exports.update = async (req, res) => {

    let role = Role.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
    });
    res.json({
        status: 200,
        message: "sucess",
        data: role
    });
}

exports.delete = async (req, res) => {
    let role = Role.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: role
    });
}

exports.one = async (req, res) => {

    let role = await Role.findOne();
    res.json({
        status: 200,
        message: "sucess",
        data: role
    })

}

exports.allBy = async (req, res) => {

    new NewsApi(response => {
        res.json(response.data)
    })
}