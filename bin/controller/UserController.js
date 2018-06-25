"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const user = new User_1.User();
class UserController {
    GetAllUsers() {
        return user.GetAllUsers();
    }
    GetUserByName(name) {
        return user.GetUserByName(name);
    }
    CreateUser(name, email) {
        return user.CreateUser(name, email);
    }
    EditUser(id, name, email) {
        return user.EditUser(id, name, email);
    }
    DeleteUser(name) {
        return user.DeleteUser(name);
    }
}
exports.UserController = UserController;
