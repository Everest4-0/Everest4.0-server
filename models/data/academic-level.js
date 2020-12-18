const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize }) => {

  const AcademicLevel = sequelize.define("academic_level", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    descriptions: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  AcademicLevel.beforeCreate(r => r.id = uuid())
  return AcademicLevel;
};