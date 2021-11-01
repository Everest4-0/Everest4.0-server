module.exports = ({ sequelize, Sequelize, defaultKeys }) => {

  const Chat = sequelize.define("chats", {
    ...defaultKeys,
    descriptions: {
      type: Sequelize.TEXT,
    },
    isOnline: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    
  });

  Chat.associate = (models) => {
    Chat.hasMany(models.ChatMessage, { as: 'messages'});
    Chat.belongsTo(models.User, { as: 'to',foreignKey: 'to_user_id'});
    Chat.belongsTo(models.User, { as: 'from',foreignKey: 'from_user_id'});
  }

  return Chat;
};