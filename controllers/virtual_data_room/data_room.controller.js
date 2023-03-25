var {
    User,
    DataRoom,
    Answer,
    updateOrCreate,
    File
} = require('../../models/models');

var fs = require("fs");
const {
    Sequelize
} = require('sequelize');
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.user.id

    let dataRoom = await DataRoom.create(req.body).catch((e, DataRoom) => {
        res.status(400).json(e || DataRoom)
    });

    if (req.body.files.length === 0) {
        res.json(dataRoom)
    } else {
        req.body.files.forEach(async (file, i) => {
            let base64Data = file.data.split('base64,')[1];
            let fileType = file.data.split(';')[0].split('/')[1];
            let fileName = i + '-' + Math.random().toString(16).substr(2, 8) + '.' + fileType;

            if (base64Data !== undefined) {
                let filePath = '/virtual_data_room/files/' + dataRoom.code + '/' + fileName;
                fs.mkdir('./public/virtual_data_room/files/' + dataRoom.code, {
                    recursive: true
                }, (err) => {
                    if (err) throw err;

                    fs.writeFile('public' + filePath, base64Data, 'base64', function (err) {
                        console.log(err);
                    });
                });
                let newFile = await File.create({
                    name: fileName,
                    type: fileType,
                    path: filePath
                })

                dataRoom.addFiles(newFile);
                dataRoom.save();

            }
            if ((i + 1) === req.body.files.length) {
                res.json(dataRoom)
            }
        })
    }
}

exports.update = async (req, res) => {

    req.body.answers.forEach(answer => {
        answer.quizId = req.body.id
        updateOrCreate(Answer, {
            id: answer.id || null
        }, answer)
    })
    let dataRoom = await DataRoom.update(req.body, {
        where: {
            id: req.body.id
        }
    });

    res.json(dataRoom);
}

exports.delete = async (req, res) => {
    let dataRoom = DataRoom.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        status: 200,
        message: "sucess",
        data: dataRoom
    });
}

exports.one = async (req, res) => {

    let dataRoom = await DataRoom.findByPk(req.params.id, {
        include: [{
                model: User,
                as: 'user'
            },
            {
                model: Answer,
                as: 'answers'
            }
        ]
    });
    res.json(dataRoom)
}

exports.allBy = async (req, res) => {

    let filter = req.query

    const where = filter,
        order = [
            ['createdAt', 'DESC']
        ],
        include = [{
                model: User,
                as: 'user'
            },
            {
                model: User,
                as: 'shareds'
            },
            {
                model: File,
                as: 'files'
            }
        ]

    const dataRooms = await paginate({
        Model: DataRoom,
        where,
        include,
        order,
        ...req.query
    })

    res.json(dataRooms)

}