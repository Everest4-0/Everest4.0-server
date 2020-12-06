var { Role } = require('../models/models');
const request = require('request');
const axios = require('axios');
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
    req.query.mkt = 'pt-PT'
    req.query.sortby = 'date'
    let p = req.query;
    let host = 'https://api.bing.microsoft.com/v7.0/news/search?' + Object.keys(p).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(p[k])).join('&');
    let headers =
    {
        "Ocp-Apim-Subscription-Key": '9fa10c25d2f641468acd7d5f1cacdddf',
        'Accept': 'application/json',
    }



    axios.get(host, {
        headers:
            headers
    })
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.json(error)
        });
}