import {DataBase} from "../DataBase";
import * as sq from 'sequelize';
let database = new DataBase();
let sequelize = database.getSequelize();
sequelize.authenticate();
const user = sequelize.define('users', {
    id_user: {
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {type: sq.STRING},
    email: {type: sq.STRING},
    id_history: {
        type: sq.INTEGER
    },
}, {tableName: "users", timestamps: false});
class User
{
    public CreateUser(name: string, email: string)
    {
        user.create({name: name, email: email}).then(() => console.log("Created user: " + name + " with email: " + email));
    }

    public GetUserByName(name: string)
    {
        user.findOne({
            where: {
                name: name
            }
        }).then(result => {
            let email = JSON.parse(JSON.stringify(result))["email"];
            console.log("Email: " + email);
        });


    }

    public GetAllUsers()
    {
        user.findAll({}).then(result => {
            for(let i = 0; i < result.length; i++)
            {
                let id_user = JSON.parse(JSON.stringify(result))[i]["id_user"];
                let name: string = JSON.parse(JSON.stringify(result))[i]["name"];
                let email = JSON.parse(JSON.stringify(result))[i]["email"];
                let id_history = JSON.parse(JSON.stringify(result))[i]["id_history"];
                console.log(id_user + " | " + name + " | " + email + " | " + id_history);
            }
        })
    }

    public EditUser(id:number, name: string, email: string)
    {
        user.update({
            name: name,
            email: email,
        }, {
                where: {
                    id_user: id
                }
            }
        );
        console.log("Updated!");
    }

    public DeleteUser(id: number)
    {
        user.destroy({
            where: {
                id_user: id
            }
        });
        console.log("Deleted!");
    }
}

export {User}