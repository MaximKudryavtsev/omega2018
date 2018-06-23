import * as restify from 'restify';
import * as bodyParser from 'body-parser';
import {DataBase} from "./DataBase";

const port = 3000;

let database = new DataBase();
//let connection = database.getConnection();
let client = database.getClient();
let server = restify.createServer({
    name: "start"
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

if(client.connect())
{
    console.log("successful connection to " + database.getDBName());
}

//client.query("INSERT INTO users(name, email, id_history) VALUES('Петя', 'vasya@mail.ru', 1)");

client.query("select * from users", (err, res) => {
    console.log(err ? err.stack : res.rows[0].email);
    client.end()
});

server.get('/',(req, res) => {
    var body = "<html><body><h1>successful connection to "+ database.getDBName() +"</h1></body></html>";
    res.write(body);
    res.end();
});

server.listen(port, ()=>{
    console.info('server started on ' + port + ' port');
});