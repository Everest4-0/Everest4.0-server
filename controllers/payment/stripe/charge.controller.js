const {  Address, Customer, Charge } = require('../../../models/models');

const Stripe = require('stripe');

const stripe = Stripe('sk_test_51IfgbGJRuKTl5x5bRLdbZbEcu8BRNthqny6g0URPP5BCp8prXMJSiDpSzcm9dmNv9SHp3HEXD1xxX04QvKZgxc5Y00OefAewwz');

exports.create = async (req, res) => {

        console.log('request data: ')

        console.log(req.body)

        stripe.customers.create({
            email: 'cos@mail.com',
            source: req.body.stripeToken,
            name: 'Jane Doe',
            address: {
                line1: 'costumer address',
                postal_code: '00744',
                city: 'Luanda',
                state: 'Luanda',
                country: 'Angola'
            }
        }).then(customer => {

            let ourCustomer = Customer.create({
                name: customer.name,
                email: customer.email,
                descriptions: customer.descriptions
            }).catch((e, Customer) => {
                res.status(400).json(e || Customer)
            });

            let ourAddress = Address.create({
                country: customer.address.country,
                postal_code: customer.address.postal_code,
                city: customer.Address.city
            }).catch((e, Address) => {
                res.status(400).json(e || Address)
            });

            console.log('custumer data: ')
            console.log(customer)

            return stripe.charges.create({
                amount: req.body.amount,
                descriptions: 'Paymant from angular',
                curency: req.body.currency,
                custumer: custumer.id
            })

        }).then(charge => {
            console.log('final charge data: ')
            console.log(charge)

            let ourCharge = Charge.create({
                descriptions: charge.descriptions,
                amount: charge.amount,
                curency: charge.curency,
                customerId: charge.customer
            }).catch((e, Charge) => {
                res.status(400).json(e || Charge)
            });

            res.send(charge)

        }).catch(err => {
            console.log('on error: ')
            console.log(err)

            res.send(err)
        })
}