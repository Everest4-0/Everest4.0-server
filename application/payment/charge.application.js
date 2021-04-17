const moment = require("moment")

class ChargeApplication {

    static REFERENCE = 0
    static CREDITCARD = 1
    static PAYPAL = 2

    static reference = (req, callback) => {

    }

    static creditCard = () => {

    }

    static paypal = () => {

    }

    static generateReference = async (Charge) => {
        let last = await Charge.findAll({
            limit: 1,
            where: {},
            order: [['createdAt', 'DESC']]
        })
        let reference = (last[0] || { reference: 0 }).reference;

        let prefix = '4';

        reference = prefix + ((reference + 1) + '').padStart(4, '0')

        return parseInt(reference);
    }
}


module.exports = ChargeApplication;