var sendgrid = require('sendgrid')(process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD);
var Hogan = require('hogan.js');
var fs = require('fs');
var nodemailer = require('nodemailer');

class Email {

    to;
    from;

    transporter;

    static template = {

    }
    constructor(data) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        data.from = 'noreplay@everest.40'
        data.html = this.render(data.template, data)
        this.data = data
    }

    send(fn) {
        // var mail={...this.data, ...object2 }
        //sendgrid.send(this.data,fn)
        this.transporter.sendMail(this.data, fn)
    }
    render = (template, data) => {
        let t = fs.readFileSync('./views/emails/' + template + '.hjs').toString()
        let h = Hogan
            .compile(t);
        let f = h.render(data)

        return f;
    }

}


module.exports = Email;