import {DataBase} from "../DataBase";
import * as sq from 'sequelize';
let database = new DataBase();
let sequelize = database.getSequelize();
sequelize.authenticate();
const history = sequelize.define('history', {
    id_history: {
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_user_history: {
        type: sq.INTEGER,
        allowNull: false
    },
    date: {
        type: sq.DATE,
        defaultValue: sq.fn('NOW')
    },
    salary: {
        type: sq.DECIMAL,
        allowNull: false
    }
}, {tableName: "history", timestamps: false});
class History
{
    public AddHistory(id_history: number, salary: string)
    {
        history.create({id_user_history: id_history, salary: salary});
    }

    public GetUserHistory(id_history: number)
    {
        return history.findAll({
            where:  {
                id_user_history: id_history
            }
        }).then(result => {
            for(let i = 0; i < result.length; i++)
            {
                let id_history = JSON.parse(JSON.stringify(result))[i]["id_history"];
                let id_user_history = JSON.parse(JSON.stringify(result))[i]["id_user_history"];
                let date = JSON.parse(JSON.stringify(result))[i]["date"];
                let salary = JSON.parse(JSON.stringify(result))[i]["salary"];
                console.log(id_history + "|" + id_user_history + "|" + date + "|" + salary);
            }


        });
    }

}

export {History}
