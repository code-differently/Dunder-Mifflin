//Models are defined through the Schema interface.
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Employee = new Schema({
    id :number,
    name: string,
    title: string,
    department: Department,
    salary: number,
    manager: string
});

const Department = new Schema({
    Department: [
        SALES,
        CORPORATE,
        ACCOUNTING,
        RECEPTION,
        HUMANRESOURCES
    ]
});

modules.export = mongoose.model("Employee, EmployeeDetails");
