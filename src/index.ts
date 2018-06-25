import * as restify from 'restify';
import * as errors from 'restify-errors';
import * as bodyParser from 'body-parser';
import * as readline from 'readline';
import {DataBase} from "./DataBase";
import {UserController} from "./controller/UserController";
import {StatusCodesConfig} from "./StatusCodesConfig";

const port = 3000;

let database = new DataBase();
let client = database.getSequelize();
let server = restify.createServer({
    name: "start"
});

const controller = new UserController();

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
    res.send(StatusCodesConfig.OK, controller.GetAllUsers());
    return next();
});

server.get('/search-user/:name', (req, res, next) => {
    if (!req.params.name) {
        return next(new errors.BadRequestError());
    }
    try {
        const user = controller.GetUserByName(req.params.name);
        res.send(StatusCodesConfig.OK, user);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});

server.post('/create-user', (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.email) {
        return next(new errors.BadRequestError());
    }
    controller.CreateUser(req.body.name, req.body.email);
    res.send(StatusCodesConfig.CREATED);
    return next();
});

server.put('/edit-user/:id_user', (req, res, next) => {
    if (!req.params.id_user || !req.body || !req.body.name) {
        return next(new errors.BadRequestError());
    }
    try {
        const user = controller.EditUser(req.params.id_user, req.body.name, req.body.email);
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
        controller.DeleteUser(req.params.id_user);
        res.send(StatusCodesConfig.NO_CONTENT);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});


server.listen(port, ()=>{
    console.info('server started on ' + port + ' port');
});