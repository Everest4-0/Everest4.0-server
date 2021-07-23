const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize }) => {

  const ServicePlan = sequelize.define("service_plans", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    value: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.INTEGER
    },
    descriptions: {
      type: Sequelize.STRING,
    },
    showIt:{
      type: Sequelize.BOOLEAN,
      default: true
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  ServicePlan.associate = (models) => {
    ServicePlan.belongsTo(models.SubscriptionPlan, { as: 'plan', foreignKey: 'planId', });
}
  ServicePlan.beforeCreate(r => r.id = uuid())
  return ServicePlan;
};