const chat = require('../../models/main/chat');
var {ChatMessage, User, Chat} = require('../../models/models');
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    req.body.to_user_id=req.body.to.id
    req.body.from_user_id=req.user.id
    req.body.chatId=req.body.chat.id
    let chatMessage = await ChatMessage.create(req.body);
    chatMessage = await ChatMessage.findByPk(chatMessage.id,{
        include: [
            {
                model: Chat,
                as: 'chat'
            },
            {
                model: User,
                as: 'from'
            },
            {
                model: User,
                as: 'to'
            }]
    })
    res.io.emit("chat-to-"+req.body.to.id.split('-')[0], chatMessage);
    res.json(chatMessage)
}

exports.update = async (req, res) => {

    let chatMessage = ChatMessage.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
    });
    res.json({
        status: 200,
        message: "sucess",
        data: chatMessage
    });
}

exports.delete = async (req, res) => {
    let chatMessage = ChatMessage.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: chatMessage
    });
}

exports.one = async (req, res) => {

    let chatMessage = await ChatMessage.findOne();
    res.json({
        status: 200,
        message: "sucess",
        data: chatMessage
    })

}

exports.allBy = async (req, res) => {

    const chatMessages = await paginate({
        Model: ChatMessage,
        ...req.query
    })

    res.json(chatMessages)
}