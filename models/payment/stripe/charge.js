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
        curency:{
            type: Sequelize.STRING
        },
        addressId:{
            type: Sequelize.STRING
        },
        customerId:{
            type: Sequelize.STRING
        },
        
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    }, {
        indexes: [{
            fields: ['id', 'userId']
        }]
    });

    Charge.associate = (models) => {
        Charge.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        })
        Charge.hasMany(models.Customer, {
            as: 'customers',
            foreignKey: 'customerId'
        })
    }

    return Charge;
};