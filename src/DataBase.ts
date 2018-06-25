import * as pg from 'pg';
import * as sq from 'sequelize';
import {DBConfig} from "./DBConfig"
const conString = "postgres://"+DBConfig.user+":"+DBConfig.password+"@"+DBConfig.host+":"+DBConfig.port+"/"+DBConfig.database+"";

class DataBase
{
    private _dbName:string = DBConfig.database;

    public getSequelize()
    {
        return new sq(DBConfig.database, DBConfig.user, DBConfig.password, {
            host: DBConfig.host,
            port: DBConfig.port,
            dialect: 'postgres'
        });
    }


    public getDBName()
    {
        return this._dbName;
    }
}

export {DataBase}