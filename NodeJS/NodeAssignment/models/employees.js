const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
// EmpID, EMpName, EmpSalary, Empdesignation, EmployeeEmail, EmployeeQualification
const mySchema = new Schema({
    EmpId: {
        type: ObjectId
    },
    EMpName: {
        type: String
    },
    EmpSalary: {
        type: Number
    },
    Empdesignation: {
        type: String
    },
    EmployeeEmail: {
        type: String
    },
    EmployeeQualification: {
        type: String
    }
});

const employee = mongoose.model('employee', mySchema);

module.exports = employee;