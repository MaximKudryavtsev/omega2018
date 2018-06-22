const HOST: string = "localhos11t";
const USER: string = "root";
const PASSWORD: string = "";
const DATABASE: string = "omega";

import * as mysql from 'mysql';
class DataBase
{
    private _dbName:string = DATABASE;

    public getConnection()
    {
        return mysql.createConnection({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        })
    }


    public getDBName()
    {
        return this._dbName;
    }
}

export {DataBase}