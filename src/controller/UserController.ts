import {User} from "../models/User";

const user = new User();

class UserController
{
    public GetAllUsers()
    {
        return user.GetAllUsers();
    }

    public GetUserByName(name: string)
    {
        return user.GetUserByName(name);
    }

    public CreateUser(name: string, email: string)
    {
        return user.CreateUser(name, email);
    }

    public EditUser(id: number, name: string, email: string)
    {
        return user.EditUser(id, name, email);
    }

    public DeleteUser(id: number)
    {
        return user.DeleteUser(id);
    }

}

export {UserController}