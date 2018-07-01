import {CsvData} from "./CsvData"
import {User} from "./User"
import * as nodemailer from "nodemailer"
import {EmailConfig} from "../config/EmailConfig"
import {HistoryController} from "../controller/HistoryController";

const user = new User();
const historyController = new HistoryController();


class Sender
{
    public Send(email: string, mailData:string, id:number, salary: string)
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
                console.log(error);
                historyController.AddHistory(id, salary, "not-sended: " + JSON.stringify(error) + "");
            }
            else
            {
                historyController.AddHistory(id, salary, "sended");
            }
            console.log('Message sent: %s', info.response);
        });
    }
}

export {Sender}