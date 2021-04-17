const { Address, Customer, Charge } = require('../../models/models');

const Stripe = require('stripe');

const stripe = Stripe('sk_test_51IeHexKPeIS2foQk5ur9bFa32oT3Q9Yf0DdShqfhRgy1Yo8DC2jJuhN2iKPzpNSXik4G8OtJgsJTvp8w5Yd47jS800UZItfE06');

exports.create = async (req, res) => {

    console.log('request data: ')

    console.log(req.body)

    req.body.amount = req.body.services.reduce((x,y)=>(y.price*req.body.quantity)+x,0).toFixed(2).split('.').join('')
    delete req.body.customer.charge
    delete req.body.customer.user
    req.body.customer.source = req.body.customer.source.id
    req.body.customer.email = req.user.email

    let ourCustomer;
    stripe.customers.create(req.body.customer)
        .then(async customer => {
            let ourAddress = await Address.create(req.body.customer.address);
            
            ourCustomer = await Customer.create({ ...req.body.customer, ...{ addressId: ourAddress.id } });
            ourCustomer.address=ourAddress;
            return stripe.charges.create({
                amount: req.body.amount,
                description: req.body.descriptions,
                currency: req.body.currency,
                customer: customer.id
            })
        }).then(async charge => {
            let ourCharge = await Charge.create({
                descriptions: charge.descriptions,
                amount: charge.amount,
                currency: charge.currency,
                customerId: ourCustomer.id
            })
            ourCharge.customer=ourCustomer;
            ourCharge.quantity=req.body.quantity
            res.json(ourCharge)

        }).catch(err => {
            console.log('on error: ')
            console.log(err)

            res.json(err)
        })
}