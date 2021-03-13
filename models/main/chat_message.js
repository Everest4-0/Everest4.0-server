const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize }) => {

  const ChatMessage = sequelize.define("chat_messages", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
    },
    message: {
      type: Sequelize.TEXT,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  ChatMessage.associate = (models) => {
    ChatMessage.belongsTo(models.Chat, { as: 'chat', foreignKey: 'chat_id', });
    ChatMessage.belongsTo(models.User, { as: 'from', foreignKey: 'from_user_id', });
    ChatMessage.belongsTo(models.User, { as: 'to', foreignKey: 'to_user_id', });
    ChatMessage.belongsTo(models.ChatMessage, { as: 'referer', foreignKey: 'referer_id', });
    
  }

  ChatMessage.beforeCreate(r => r.id = uuid())
  return ChatMessage;
};