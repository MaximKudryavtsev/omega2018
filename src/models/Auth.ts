import {DataBase} from "../DataBase";
import * as sq from 'sequelize';
declare let restifySession: any;

const database = new DataBase();
const sequelize = database.getSequelize();
sequelize.authenticate();


const auth = sequelize.define('admin', {

    login: {
        type: sq.STRING
    },
    password: {
        type: sq.STRING
    }
}, {tableName: "admin", timestamps: false});

class Auth
{
    public Login(login: string, password: string)
    {
        return auth.findOne({
            where: {
                login: login,
                password: password
            }
        });
    }
}

export {Auth}