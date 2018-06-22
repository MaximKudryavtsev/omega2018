import * as restify from 'restify';
import * as bodyParser from 'body-parser';
import {DataBase} from "./DataBase";

const port = 3000;

let database = new DataBase();
let connection = database.getConnection();
let server = restify.createServer({
    name: "start"
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

connection.connect(err => {
    if(!err) {
        console.log("successful connection to " + database.getDBName());
    } else {
        console.log(err);
    }
});

server.get('/',(req, res) => {
    var body = "<html><body><h1>successful connection to "+ database.getDBName() +"</h1></body></html>";
    res.write(body);
    res.end();
});

server.listen(port, ()=>{
    console.info('server started on ' + port + ' port');
});