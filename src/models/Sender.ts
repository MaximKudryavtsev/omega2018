import {CsvData} from "./CsvData"
import {User} from "./User"
import * as nodemailer from "nodemailer"
import {EmailConfig} from "../config/EmailConfig"

const user = new User();

class Sender
{
 /*   private _data: CsvData[];
    constructor(data: CsvData[])
    {
        this._data = data;
    }*/

    public Send(email: string, mailData:string)
    {

        let transporter = nodemailer.createTransport({
            host: EmailConfig.host,
            port: EmailConfig.port,
            secure: EmailConfig.secure, // true for 465, false for other ports
            auth: {
                user: EmailConfig.auth.user, // generated ethereal user
                pass: EmailConfig.auth.pass// generated ethereal password
            }

        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: "Salary manager" + "\<"+EmailConfig.auth.user+"\>", // sender address
            to: email, // list of receivers
            subject: 'Salary', // Subject line
            text: mailData, // plain text body
            html: '<div>'+mailData+'</div>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }
}

export {Sender}