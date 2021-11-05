var sendgrid = require('sendgrid')(process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD);

var Hogan = require('hogan.js');
var ejs = require('ejs');

const fs = require("fs");
const path = require("path");
var nodemailer = require('nodemailer');
const { readFile } = require('fs/promises');

class Email {

    transporter;

    constructor(data) {

        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER,
            port: 993,
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        })

        this.dirname=__dirname;
        data.from = '"Pedro Joao" <pedrojoaodev@gmail.com>' 

        this.data = data
        this.data.html = this.render()

    }


     send = (fn) => {
       let info = this.transporter.sendMail(this.data, fn)
    }

    render = function() {
        let f = fs.readFileSync(path.join(__dirname , '../../views/emails/default.ejs')).toString();
        let file = ejs.render(f, this);
        /** let h = Hogan
            .compile(f);

        let file = h.render(this.data)
*/
        return file;
    }

}


module.exports = Email;