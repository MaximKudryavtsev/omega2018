import {Auth} from "../models/Auth";

const auth = new Auth();

class AuthController
{
    public Login(login: string, password: string)
    {
        return auth.Login(login, password);
    }
}

export {AuthController}

