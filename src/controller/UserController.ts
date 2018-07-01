import {User} from "../models/User";

const user = new User();

class UserController
{
    public GetAllUsers()
    {
        return user.GetAllUsers();
    }

    public GetEmailByName(name: string)
    {
        return user.GetEmailByName(name);
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

    public GetEmail()
    {
        return user.GetEmail();
    }

    public GetUserByIdUser(id:number)
    {
        return user.GetUserByIdUser(id);
    }
}

export {UserController}