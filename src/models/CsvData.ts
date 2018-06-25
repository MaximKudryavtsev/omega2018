class CsvData {
    private name: string;
    private salary: string;
    constructor(name: string, salary: string) {
        this.name = name;
        this.salary = salary;
    }

    public getName() : string
    {
        return this.name;
    }

    public getSalary() : string
    {
        return this.salary;
    }
}

export {CsvData};