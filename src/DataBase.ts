import * as pg from 'pg';
import {DBConfig} from "./DBConfig"
const conString = "postgres://"+DBConfig.user+":"+DBConfig.password+"@"+DBConfig.host+":"+DBConfig.port+"/"+DBConfig.database+"";

class DataBase
{
    private _dbName:string = DBConfig.database;

    public getConnection()
    {
        let client = new pg.Client(conString);
        return client.connect();
    }

    public getClient()
    {
        return new pg.Client(conString);
    }


    public getDBName()
    {
        return this._dbName;
    }
}

export {DataBase}