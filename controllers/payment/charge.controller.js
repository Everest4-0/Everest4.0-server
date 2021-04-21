const { Address, Customer, Charge } = require('../../models/models');
const moment = require('moment');
const Stripe = require('stripe');
const ChargeApplication = require('../../application/payment/charge.application');
const referenceApplication = require('../../application/payment/reference.application');

const stripe = Stripe('sk_test_51IeHexKPeIS2foQk5ur9bFa32oT3Q9Yf0DdShqfhRgy1Yo8DC2jJuhN2iKPzpNSXik4G8OtJgsJTvp8w5Yd47jS800UZItfE06');

exports.create = async (req, res) => {

    let amount = req.body.services.reduce((x, y) => (y.price * req.body.quantity) + x, 0).toFixed(2)
    req.body.amount = amount.split('.').join('')
    delete req.body.customer.charge
    delete req.body.customer.user
    if (req.body.customer.source) {
        req.body.customer.source = req.body.customer.source.id
    }
    req.body.customer.email = req.user.email

    let ourCustomer = { id: null };

    let callback = async (charge, callback) => {
        let ourCharge = await Charge.create({
            descriptions: charge.descriptions,
            amount: amount,
            currency: charge.currency,
            customerId: ourCustomer.id,
            isActive: req.body.isActive
        })
        ourCharge.customer = ourCustomer;
        ourCharge.quantity = req.body.quantity

        let u = callback(ourCharge)
        res.json(ourCharge)

    }

    if (req.body.type === ChargeApplication.REFERENCE) {
        req.body.isActive = false
        callback(req.body, async (data) => {
            return  final = await referenceApplication.create({
                amount: data.amount,
                end_datetime: moment(data.createdAt).add(1, 'days').format('YYYY-MM-DD'),
                custom_fields: {
                    reference: data.reference.toString()
                }
            })
        });
    } else if (req.body.type === ChargeApplication.CREDITCARD) {
        req.body.isActive = true;
        stripe.customers.create(req.body.customer)
            .then(async customer => {
                let ourAddress = await Address.create(req.body.customer.address);

                ourCustomer = await Customer.create({ ...req.body.customer, ...{ addressId: ourAddress.id } });
                ourCustomer.address = ourAddress;
                return stripe.charges.create({
                    amount: req.body.amount,
                    description: req.body.descriptions,
                    currency: req.body.currency,
                    customer: customer.id
                })
            }).then(callback).catch(err => {
                console.log('on error: ')
                console.log(err)

                res.json(err)
            })
    }
}