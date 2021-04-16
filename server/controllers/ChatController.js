const ChatMessage = require('../models/ChatMessage');

exports.getMessages = async (req, res, next) => {
    try {
        const groupId = req.params.id;
        const messages = await ChatMessage.findAll({
            where: {
                GroupId: groupId
            }
        });
        const messagesJSON = JSON.stringify(messages);
        res.send(messagesJSON);
    } catch (err) {console.log(err)}
};