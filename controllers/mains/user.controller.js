var { 
    User
    , Role
    , PersonalData
    , Op
    , PersonalSettings
    , AcademicLevel
    , WorkSituation
    , ProfessionalExperience 
} = require('../../models/models');

const queryData={
    include: [
        {
            model: Role,
            as: 'role'
        },
        {
            model: PersonalData,
            as: 'datas',
            include: [

                {
                    model: AcademicLevel,
                    as: 'academicLevel'
                },
                {
                    model: ProfessionalExperience,
                    as: 'professionalExperience'
                },
                {
                    model: WorkSituation,
                    as: 'workSituation'
                }
            ]
        },
        {
            model: PersonalSettings,
            as: 'settings'
        }
    ]
}

exports.create = async (req, res) => {
    console.log(req.body)
    let user = await User.create(req.body).catch((e, user) => {
        res.status(400).json(e || user)
    });

    req.body.datas = {...{id:user.id},...req.body.datas }
    user.settings = await PersonalSettings.create(req.body.datas);
    user.datas = await PersonalData.create(req.body.datas);
    let y = await User.update({ dataId: user.id, settingId: user.id }, { where: { id: user.id } })

    res.json(user)
}

exports.update = async (req, res) => {

    var base64Data = req.body.photoUrl.split('base64,')[1];
    if (base64Data !== undefined) {
        req.body.photoUrl = '/avatar/costum/avatar-' + req.body.email + '.' + req.body.photoUrl.split(';')[0].split('/')[1];
        require("fs").writeFile('public' + req.body.photoUrl, base64Data, 'base64', function (err) {
            console.log(err);
        });
    }

    req.body.datas.pro_expId = req.body.datas.professionalExperience
    req.body.datas.act_secId = req.body.datas.activitySector
    req.body.datas.work_sitId = req.body.datas.workSituation
    req.body.datas.acad_levelId = req.body.datas.academicLevel
    await PersonalData.update(req.body.datas, {
        where: { id: req.body.id }
    })
    await PersonalSettings.update(req.body.settings, {
        where: { id: req.body.id }
    })
    req.body.isActive = true;
    await User.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    let user = await User.findByPk(req.body.id, {
        include: [
            {
                model: Role,
                as: 'role'
            }
        ]
    }).catch(e => {

        let i = e
    });
    res.json(user);
}

exports.delete = async (req, res) => {
    let user = User.destroy({ where: { id: req.params.id } })
    res.json({
        status: 200,
        message: "sucess",
        data: user
    });
}

exports.one = async (req, res) => {

    let user = await User.findByPk(req.params.id, queryData);
    res.json(user)
}

exports.authenticate = async (req, res, next) => {

    let user = await User.findOne({ where: { email: req.body.email } },queryData);


    if (!user && req.body.provider !== 'LOCAL') {
        user = await User.create(req.body, (user) => {
            let o = user;
        });

        req.body.datas.id = user.id
        user.settings = await PersonalSettings.create(req.body.datas);
        user.datas = await PersonalData.create(req.body.datas);
        let y = await User.update({ dataId: user.id, settingId: user.id }, { where: { id: user.id } })
    }
    else if (user && req.body.provider !== 'LOCAL') {
        if (!user.isActive)
            user = await User.update(req.body, {
                where: { email: req.body.email }
            },(e,r)=>{
                let u=e;
            })/*.catch(e){
                let r=e
            }*/
        user = await User.findOne({ where: { email: req.body.email } },queryData);
        res.status(200)
    }
    else if (!user)
        user={code:404}
    else if (req.body.id || User.validatePassword(user, req.body.password)){
    }
    else
        user.code=401

    //res.json(user)
    req.user=user
    next()
}
exports.allBy = async (req, res) => {

    let filter = {}

    if (req.query['$filter']) {
        filter = {
            [Op.or]: [
                {
                    email: { [Op.like]: '%' + req.query['$filter'].toLowerCase() + '%' }
                },
                {
                    telePhone: { [Op.like]: '%' + req.query['$filter'].toLowerCase() + '%' }
                },
                {
                    roles: { [Op.like]: '%' + req.query['$filter'] + '%' }
                }
              ]
        }
    }


    let users = await User.findAll({
        where: filter,
        include: [
            {
                model: Role,
                as: 'role'
            },
            {
                model: PersonalData,
                as: 'datas'
            }
        ]
    }).catch((e, r) => {
        let u = e
    });
    //res.statusCode = 401
    res.json(users)
}

