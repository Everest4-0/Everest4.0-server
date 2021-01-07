

class CourseHelper {


    static nextCode = async (M, prefix = null) => {
        let last = await M.findAll({
            limit: 1,
            where: {},
            order: [['createdAt', 'DESC']]
        })
        let code = ((last[0] || { code: 0 }).code || '').split('.')

        prefix = prefix ? prefix + '.' : '';
        let sufix = code[code.length > 1 ? 1 : 0];

        code = prefix + (((parseInt(sufix) || 0) + 1) + '').padStart(3, '0')
        return code;
    }

    static initializer = async (course) => {
        const { Activity, Module, ActivityTask, TaskAnswer } = require("../../models/models");
        let intro = await Module.create({
            title: 'Introdução',
            descriptions: '',
            orderNo: -1,
            courseId: course.id
        }).catch(err => {
            let r = err;
        })
        await Activity.create({
            title: 'Avaliação do perfil de entrada',
            descriptions: '',
            orderNo: 100,
            moduleId: intro.id,
            attType: 3
        })

        let final = await Module.create({
            title: 'Conclusão',
            descriptions: '',
            orderNo: 100,
            courseId: course.id
        })

        await Activity.create({
            title: 'Exame final',
            descriptions: '',
            orderNo: 2,
            moduleId: final.id,
            attType: 3
        })
        await CourseHelper.survey(final)
    }

    static saveCover = async (course, cover) => {

        const fs = require("fs");

        if (cover === undefined) { return; }
        var base64Data = cover.split('base64,')[1];
        if (base64Data !== undefined) {
            course.cover = '/courses/' + course.code + '/cover-' + course.id.split('-')[0] + '.' + cover.split(';')[0].split('/')[1];
            fs.mkdir('./public/courses/' + course.code, { recursive: true }, (err) => {
                if (err) throw err;

                fs.writeFile('public' + course.cover, base64Data, 'base64', function (err) {
                    course.save();
                });
            });
        }

    }

    static survey = async (model) => {

        const { Activity, Module, ActivityTask, TaskAnswer } = require("../../models/models");
        let activity = await Activity.create({
            title: 'Avaliação do curso',
            descriptions: '',
            orderNo: 99,
            moduleId: model.id,
            duration: 15,
            attType: 3
        })
        const answers = [
            { text: "Sin" },
            { text: "Não" },
            { text: "Péssimo" },
        ]
        const surveys = [
            {
                text: "Este curso/módulo correspondeu a sua expectativa, ou seja, contribuiu para consolidar e/ou adquirir novos conhecimentos e habilidades?",
                activityId: activity.id,
                answers: answers
            },
            {
                text: "Os conhecimentos e habilidades adquiridos serão úteis no seu dia-a-dia?",
                activityId: activity.id,
                answers: answers
            },
            {
                text: "A organização e a qualidade do conteúdo facilitaram a aprendizagem?",
                activityId: activity.id,
                answers: answers
            },
            {
                text: "As actividades propostas (exercícios, casos práticos, estudos de caso, etc.) foram pertinentes?",
                activityId: activity.id,
                answers: answers
            }
        ].forEach(async survey => {

            let activity = await ActivityTask.create(survey)

            survey.answers.forEach(async answer => await TaskAnswer.create({ ...answer, ...{ taskId: activity.id } }))

        })
    }
}


module.exports = CourseHelper