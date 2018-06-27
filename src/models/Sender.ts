import {CsvData} from "./CsvData"
import {User} from "./User"

const user = new User();

class Sender
{

    private _data: CsvData[];
    constructor(data: CsvData[])
    {
        this._data = data;
    }

    public Send()
    {
        
    }
}

export {Sender}