const { v4: uuid } = require('uuid');

module.exports = ({sequelize, Sequelize}) => {

    const Customer = sequelize.define("customers", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        name:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },        
        isActive:{
            type: Sequelize.BOOLEAN
        },        
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    Customer.associate = (models) => {

        Customer.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });

        Customer.belongsTo(models.Address, {
            as: 'address',
            foreignKey: 'addressId'
        })
        Customer.hasMany(models.Charge, {
            as: 'charges',
            foreignKey: 'customerId'
        })
    }

    Customer.beforeCreate(customer => customer.id = uuid())
    return Customer;
};