import {CsvData} from "../models/CsvData";

class CsvParser {
    private csvSeparator = '\n';
    private inlineSeparator = ',';

    public Parse(csvString: string): CsvData[] {
        let data:CsvData[] = [];

        let splittedData: Array<string> = csvString.split(this.csvSeparator);
        for (let entry of splittedData) {
            let splittedDataString: string[] = entry.split(this.inlineSeparator);
            let name: string = splittedDataString[1];
            let salary: string = splittedDataString[2].replace(' ', "");

            let csvData = new CsvData(name, salary);
            data.push(csvData);
        }
        return data;
    }
}

export {CsvParser};