import {History} from "../models/History";

const history = new History();

class HistoryController
{
    public AddHistory(id_user: number, salary: string, state: string)
    {
        return history.AddHistory(id_user, salary, state);
    }

    public GetUserHistory(id_user: number)
    {
        return history.GetUserHistory(id_user);
    }

}

export {HistoryController}