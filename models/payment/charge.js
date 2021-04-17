const { v4: uuid } = require('uuid');
const ChargeApplication = require('../../application/payment/charge.application');

module.exports = ({ sequelize, Sequelize }) => {

    const Charge = sequelize.define("charges", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        description: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.DECIMAL
        },
        currency: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN
        },
        type: {
            type: Sequelize.INTEGER,
            default: 0,
        },
        reference: {
            type: Sequelize.INTEGER
        },
        entity: {
            type: Sequelize.INTEGER
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

    Charge.beforeCreate(charge => charge.id = uuid())
    Charge.beforeCreate(charge => charge.entity = 90004)
    Charge.beforeCreate(async charge => charge.reference = await ChargeApplication.generateReference(Charge))
    return Charge;
};