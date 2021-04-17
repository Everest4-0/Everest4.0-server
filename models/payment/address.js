const { v4: uuid } = require('uuid');

module.exports = ({sequelize, Sequelize}) => {

    const Address = sequelize.define("addresses", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        country:{
            type: Sequelize.STRING
        },
        postal_code:{
            type: Sequelize.STRING
        },
        city:{
            type: Sequelize.STRING
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });



    Address.beforeCreate(address => address.id = uuid())
    return Address;
};