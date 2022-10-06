const employees = require('express').Router();
const employeesModel = require('../models/employees');


employees.get('/:id', async (req, res) => {
    try {
        let employee = await employeesModel.findOne({
            _id: req.params.id
        });
        return res.send(employee);
    } catch (error) {
        return res.send(error)
    }
})

employees.get('/', async (req, res) => {
    try {
        let employees = await employeesModel.find().sort({
            _id: -1
        });
        return res.send(employees);
    } catch (error) {
        return res.send(error)
    }
})

employees.post('/', async (req, res) => {
    try {
        let employee = await employeesModel.create(req.body);
        return res.send({
            message: 'Created',
            employee
        });
    } catch (error) {
        return res.send(error)
    }
})

employees.put('/:id', async (req, res) => {
    try {
        let data = req.body;
        let employeeUpdate = await employeesModel.updateOne({
            _id: req.params.id
        }, data);
        return res.send({
            message: 'Updated',
            employeeUpdate
        });
    } catch (error) {
        return res.send(error)
    }
})

employees.delete('/:id', async (req, res) => {
    try {
        let employeeDelete = await employeesModel.deleteOne({
            _id: req.params.id
        });
        return res.send({
            message: 'Deleted',
            employeeDelete
        });
    } catch (error) {
        res.send(error)
    }
})

module.exports = employees;