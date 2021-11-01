module.exports = ({ sequelize, Sequelize, defaultKeys }) => {

  const ChatMessage = sequelize.define("chat_messages", {
    ...defaultKeys,
    message: {
      type: Sequelize.TEXT,
    },
  });

  ChatMessage.associate = (models) => {
    ChatMessage.belongsTo(models.Chat, { as: 'chat', foreignKey: 'chat_id', });
    ChatMessage.belongsTo(models.User, { as: 'from', foreignKey: 'from_user_id', });
    ChatMessage.belongsTo(models.User, { as: 'to', foreignKey: 'to_user_id', });
    ChatMessage.belongsTo(models.ChatMessage, { as: 'referer', foreignKey: 'referer_id', });
    
  }
  
  return ChatMessage;
};