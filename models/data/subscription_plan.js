const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize }) => {

    const SubscriptionPlan = sequelize.define("subscription_plans", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        price: {
            type: Sequelize.DECIMAL
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

    SubscriptionPlan.associate = (models) => {
        SubscriptionPlan.hasMany(models.ServicePlan, { as: 'services', foreignKey: 'planId', });
    }
    
    SubscriptionPlan.beforeCreate(r => r.id = uuid())
    return SubscriptionPlan;
};