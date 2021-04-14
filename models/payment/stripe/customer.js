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
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    charge.associate = (models) => {
        charge.hasMany(models.Address, {
            as: 'addresses',
            foreignKey: 'addressId'
        })
    }

    return Customer;
};