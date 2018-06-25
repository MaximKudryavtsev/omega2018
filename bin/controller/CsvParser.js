"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CsvData_1 = require("../models/CsvData");
class CsvParser {
    constructor() {
        this.csvSeparator = '\n';
        this.inlineSeparator = ',';
    }
    Parse(csvString) {
        let data = [];
        let splittedData = csvString.split(this.csvSeparator);
        for (let entry of splittedData) {
            let splittedDataString = entry.split(this.inlineSeparator);
            let name = splittedDataString[1];
            let salary = splittedDataString[2].replace(' ', "");
            let csvData = new CsvData_1.CsvData(name, salary);
            data.push(csvData);
        }
        return data;
    }
}
exports.CsvParser = CsvParser;
