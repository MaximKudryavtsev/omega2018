const Sequelize = require("sequelize");
const db = new Sequelize('database', 'root', 'password', {
    dialect: 'mysql'
});

const User = require('../models/user')(db);

class UsersController{
    create(name, email){
        // create new user
        console.log("Create user: " + name + "-" + email);
    }

    get(name){
        // find specific user
        console.log("Get user: " + name);
    }

    update(name, email){
        // update user data by username
        console.log("Update user: " + name + "-" + email);
    }

    delete(name) {
        // delete user
        console.log("Delete user: " +  name);
    }

    getAll(){
        // get all users data
        console.log("Get all users");
    }

    getUserHistory(name)
    {
        console.log("Get user: " + name + "-history");
        // returns array of user e-mails
    }
}

module.exports = new UsersController();