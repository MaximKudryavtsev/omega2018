import {CsvData} from "./CsvData"
import {User} from "./User"
import * as nodemailer from "nodemailer"
import {EmailConfig} from "../config/EmailConfig"

const user = new User();

class Sender
{
    public Send(email: string, mailData:string)
    {

        let transporter = nodemailer.createTransport({
            host: EmailConfig.host,
            port: EmailConfig.port,
            secure: EmailConfig.secure,
            auth: {
                user: EmailConfig.auth.user,
                pass: EmailConfig.auth.pass
            }

        });

        let mailOptions = {
            from: "Salary manager" + "\<"+EmailConfig.auth.user+"\>",
            to: email,
            subject: 'Salary',
            text: mailData,
            html: '<div>'+mailData+'</div>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }
}

export {Sender}