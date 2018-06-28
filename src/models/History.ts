import {DataBase} from "../DataBase";
import * as sq from 'sequelize';
import {UserController} from "../controller/UserController";

const database = new DataBase();
const sequelize = database.getSequelize();
sequelize.authenticate();



const userController = new UserController();

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
    salary: {
        type: sq.DECIMAL,
        allowNull: false
    },
    createdAt: {
        type: sq.DATE(3),
        defaultValue: new Date()
    },
    updatedAt: {
        type: sq.DATE(3),
        defaultValue: new Date()
    }
}, {tableName: "history", timestamps: true});
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
            if(result.length == 0)
            {
                console.log('not found')
            }
            else
            {
                for(let i = 0; i < result.length; i++)
                {
                    let id_user_history = JSON.parse(JSON.stringify(result))[i]["id_user_history"];
                    let date = JSON.parse(JSON.stringify(result))[i]["createdAt"];
                    let salary = JSON.parse(JSON.stringify(result))[i]["salary"];
                    userController.GetUserByIdHistory(id_user_history).then(result => {
                        const name = JSON.parse(JSON.stringify(result))["name"];
                        console.log(i + 1 + " | " + name + " | " + date + " | " + salary);
                    });

                }
            }



        });
    }

}

export {History}
