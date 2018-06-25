"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg = require("pg");
const DBConfig_1 = require("./DBConfig");
const conString = "postgres://" + DBConfig_1.DBConfig.user + ":" + DBConfig_1.DBConfig.password + "@" + DBConfig_1.DBConfig.host + ":" + DBConfig_1.DBConfig.port + "/" + DBConfig_1.DBConfig.database + "";
class DataBase {
    constructor() {
        this._dbName = DBConfig_1.DBConfig.database;
    }
    getConnection() {
        let client = new pg.Client(conString);
        return client.connect();
    }
    getClient() {
        return new pg.Client(conString);
    }
    getDBName() {
        return this._dbName;
    }
}
exports.DataBase = DataBase;
