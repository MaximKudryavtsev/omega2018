"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CsvData_1 = require("CsvData");
function csvStringToDataArray(csvString) {
    let data = [];
    let splittedData = csvString.split('\n');
    for (let entry of splittedData) {
        let splittedDataString = entry.split(',');
        let name = splittedDataString[1];
        let salary = splittedDataString[2].replace(' ', "");
        let csvData = new CsvData_1.CsvData(name, salary);
        data.push(csvData);
    }
    return data;
}
let csvString = "1,Старыгин Константин Александрович,1 234\n" +
    "2,Цепелева Татьяна Александровна,1 235\n" +
    "3,Кузин Никита Олегович,1 236\n" +
    "4,Ведушев Алексей Анатольевич,1 237\n" +
    "5,Тимакова Елена Сергеевна,1 238\n" +
    "6,Егошин Роман Николаевич,1 239";
let csvData = csvStringToDataArray(csvString);
console.log(csvData);
