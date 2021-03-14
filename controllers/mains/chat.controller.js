var { Chat, ChatMessage, User } = require('../../models/models');

exports.create = async (req, res) => {
    let chat = await Chat.create(req.body);
    res.io.emit("socketToMe", "users");
    res.json(chat)
}

exports.update = async (req, res) => {

    let chat = Chat.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
    });
    res.json({
        status: 200,
        message: "sucess",
        data: chat
    });
}

exports.delete = async (req, res) => {
    let chat = Chat.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: chat
    });
}

exports.one = async (req, res) => {

    let chat = await Chat.findByPk(req.params.id,{
        include: [
            {
                model: ChatMessage,
                as: 'messages',
                include: [
                    {
                        model: User,
                        as: 'from'
                    },
                    {
                        model: User,
                        as: 'to'
                    }]
            }]
    });
    //socket.customId = data.customId;
    res.json(chat)

}

exports.allBy = async (req, res) => {

    let chats = await Chat.findAll({
        include: [
            {
                model: ChatMessage,
                as: 'messages', 
                include: [
                    {
                        model: User,
                        as: 'from'
                    },
                    {
                        model: User,
                        as: 'to'
                    }]

            }]
    });
    //res.statusCode = 401
    res.json(chats)
}