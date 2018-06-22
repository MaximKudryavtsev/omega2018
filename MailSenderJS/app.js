const Restify = require("restify");
const errors = require("restify-errors");
const Sequelize = require("sequelize");

const connection = new Sequelize("demo", "root", "password", {
    dialect: "mysql"
});

const controller = require('./controllers/usersController.js');

const port = 3000;
const server = Restify.createServer();

server.get('/users', (req, res, next) => {
    res.send(200, controller.getAll());
    return next();
});

server.get('/users/:name', (req, res, next) => {
    if (!req.params.name) {
        return next(new errors.BadRequestError());
    }
    try {
        const user = controller.get(+req.params.name);
        res.send(200, user);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});

server.post('/users', (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.email) {
        return next(new errors.BadRequestError());
    }
    controller.create(+req.body.name, req.body.email);
    res.send(201);
    return next();
});

server.put('/users/:name', (req, res, next) => {
    if (!req.params.name || !req.body || !req.body.name) {
        return next(new errors.BadRequestError());
    }
    try {
        const user = controller.update(+req.params.name, req.body.email);
        res.send(200, user);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});

server.del('/users/:name', (req, res, next) => {
    if (!req.params.name) {
        return next(new errors.BadRequestError());
    }
    try {
        controller.delete(+req.params.name);
        res.send(204);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});


server.listen(port, () => {
    console.info(`Server  is running on port ${port}`);
});
