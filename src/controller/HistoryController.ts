import {History} from "../models/History";

const history = new History();

class HistoryController
{
    public AddHistory(id_history: number, salary: string)
    {
        return history.AddHistory(id_history, salary);
    }

    public GetUserHistory(id_user_history: number)
    {
        return history.GetUserHistory(id_user_history);
    }

}

export {HistoryController}