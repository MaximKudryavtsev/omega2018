import * as restify from 'restify';
import * as errors from 'restify-errors';
import * as bodyParser from 'body-parser';
import * as readline from 'readline';
import {DataBase} from "./DataBase";
import {UserController} from "./controller/UserController";
import {HistoryController} from "./controller/HistoryController";
import {StatusCodesConfig} from "./config/StatusCodesConfig";
import {CsvParser} from "./controller/CsvParser";
import {CsvData} from "./models/CsvData";
import {Sender} from "./models/Sender";



const port = 3000;

let database = new DataBase();
let client = database.getSequelize();
let server = restify.createServer({
    name: "start"
});

const userController = new UserController();
const historyController = new HistoryController();

const parser = new CsvParser();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

client.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

server.get('/get-users', (req, res, next) => {
    res.send(StatusCodesConfig.OK, userController.GetAllUsers());
    return next();
});

server.get('/search-user/:name', (req, res, next) => {
    if (!req.params.name) {
        return next(new errors.BadRequestError());
    }
    try {
        const user = userController.GetEmailByName(req.params.name);
        res.send(StatusCodesConfig.OK, user);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});

server.get('/get-history/:id', (req, res, next) => {
    if (!req.params.id) {
        return next(new errors.BadRequestError());
    }
    try {
        const history = historyController.GetUserHistory(req.params.id);
        res.send(StatusCodesConfig.OK, history);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});

server.post('/send', (req, res, next) => {
    let dataString:string = "3,Кудрявцев Максим Анатольевич, 12314";
        /*"3,Кузин Никита Олегович,1 236\n" +
        "4,Ведушев Алексей Анатольевич,1 237\n" +
        "5,Тимакова Елена Сергеевна,1 238\n" +
        "6,Егошин Роман Николаевич,1 239";*/
    let data:CsvData[] = parser.Parse(dataString);
    const sender = new Sender();
    for(let i = 0; i < data.length; i++)
    {
        let name = data[i].getName();
        let salary = data[i].getSalary();
        userController.GetEmailByName(name).then(result => {
            const email = JSON.parse(JSON.stringify(result))["email"];
            const id:number = parseInt(JSON.parse(JSON.stringify(result))["id_user_history"]);
            const mailData = name + ", вам зачислено " + salary;

            sender.Send(email, mailData);
            historyController.AddHistory(id, salary);
        });
    }

    res.send(StatusCodesConfig.CREATED);
    return next();
});

server.post('/create-user', (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.email) {
        return next(new errors.BadRequestError());
    }
    userController.CreateUser(req.body.name, req.body.email);
    res.send(StatusCodesConfig.CREATED);
    return next();
});

server.put('/edit-user/:id_user', (req, res, next) => {
    if (!req.params.id_user || !req.body || !req.body.name) {
        return next(new errors.BadRequestError());
    }
    try {
        const user = userController.EditUser(req.params.id_user, req.body.name, req.body.email);
        res.send(StatusCodesConfig.OK, user);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});

server.del('/delete-user/:id_user', (req, res, next) => {
    if (!req.params.id_user) {
        return next(new errors.BadRequestError());
    }
    try {
        userController.DeleteUser(req.params.id_user);
        res.send(StatusCodesConfig.NO_CONTENT);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});



server.listen(port, ()=>{
    console.info('server started on ' + port + ' port');
});