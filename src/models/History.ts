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
    id_user: {
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
    },
    state: {
        type: sq.STRING
    }
}, {tableName: "history", timestamps: true});
class History
{
    public AddHistory(id_user: number, salary: string, state: string)
    {
        history.create({id_user: id_user, salary: salary, state: state});
    }

    public GetUserHistory(id_user: number)
    {
        return history.findAll({
            where:  {
                id_user: id_user
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
                    let id_user = JSON.parse(JSON.stringify(result))[i]["id_user"];
                    let date = JSON.parse(JSON.stringify(result))[i]["createdAt"];
                    let salary = JSON.parse(JSON.stringify(result))[i]["salary"];
                    let state = JSON.parse(JSON.stringify(result))[i]["state"];
                    userController.GetUserByIdUser(id_user).then(result => {
                        const name = JSON.parse(JSON.stringify(result))["name"];
                        console.log(i + 1 + " | " + name + " | " + date + " | " + salary + " | " + state);
                    });

                }
            }



        });
    }

}

export {History}
