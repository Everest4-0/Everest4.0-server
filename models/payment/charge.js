const { v4: uuid } = require('uuid');

module.exports = ({sequelize, Sequelize}) => {

    const Charge = sequelize.define("charges", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        description:{
            type: Sequelize.STRING
        },
        amount:{
            type: Sequelize.DECIMAL
        },
        currency:{
            type: Sequelize.STRING
        },
        isActive:{
            type: Sequelize.BOOLEAN
        },
        
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    Charge.associate = (models) => {
        Charge.belongsTo(models.Customer, {
            as: 'customers',
            foreignKey: 'customerId'
        })
    }

    return Charge;
};