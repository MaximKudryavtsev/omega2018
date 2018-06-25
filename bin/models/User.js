"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataBase_1 = require("../DataBase");
let database = new DataBase_1.DataBase();
let client = database.getClient();
client.connect();
class User {
    CreateUser(name, email) {
        client.query("INSERT INTO users(name, email) VALUES($1, $2)", [name, email]);
        console.log("Created user: " + name + "-" + email);
    }
    GetUserByName(name) {
        client.query("SELECT * FROM users WHERE name = $1", [name], (err, res) => {
            console.log(res.rows[0].id_user + " | " + res.rows[0].name.replace(/\s/g, '') + " | " + res.rows[0].email + " | " + res.rows[0].id_history);
        });
    }
    GetAllUsers() {
        client.query("select * from users", (err, res) => {
            for (let i = 0; i < res.rows.length; i++) {
                console.log(res.rows[i].id_user + " | " + res.rows[i].name.replace(/\s/g, '') + " | " + res.rows[i].email + " | " + res.rows[i].id_history);
            }
        });
    }
    EditUser(id, name, email) {
        client.query("UPDATE users SET name = $1, email = $2 WHERE id_user = $3", [name, email, id]);
        console.log("Updated!");
    }
    DeleteUser(name) {
        client.query("DELETE FROM users WHERE name = $1", [name]);
        console.log("Updated!");
    }
}
exports.User = User;
