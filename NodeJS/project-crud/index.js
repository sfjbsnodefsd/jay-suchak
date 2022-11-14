const mySql = require('mysql')
const express = require('express')
const app = express();

app.use(express.json());
/** local */
// const connect = mySql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'welcome$1234',
//     database: 'employeedb',
//     multipleStatements: true
// })

/**aws */

const connect = mySql.createConnection({
    host: 'database-1-jay.ccuk83kbvjoz.ap-northeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin1234',
    database: 'employeedb',
    multipleStatements: true
})

connect.connect((err) => {
    if (err) {
        console.error(JSON.stringify(err, null, 2));
    } else {
        console.log('Database connected');
    }
})

let server = app.listen(5000, () => {
    console.log(`Server running at ${server.address().port}`);
})
app.get('/', (req, res) => {
    return res.send('Welcome Jay');
})
//  gett all
app.get('/getEmp', async (req, res) => {
    connect.query('select * from employeedata', (err, data, fields) => {
        if (err) throw err;
        return res.send(data);
    });
})

// get by id
app.get('/getEmp/:id', async (req, res) => {
    connect.query(`select * from employeedata where empId=${req.params.id}`, (err, data, fields) => {
        if (err) throw err;
        return res.send(data[0]);
    });
})

// delete by id
app.delete('/getEmp/:id', async (req, res) => {
    connect.query(`delete from employeedata where empId=${req.params.id}`, (err, data, fields) => {
        if (err) throw err;
        return res.send(data);
    });
})

// insert employee
app.post('/addEmployee', async (req, res) => {
    let empData = req.body;
    console.log(empData);
    let sqlQuery = `SET @empId = ?; SET @name = ?; SET @salary = ?;SET @empCode = ?;
    CALL employeeAddOrEdit(@empId, @name, @salary, @empCode);`;
    connect.query(sqlQuery, [empData.empId, empData.name, empData.salary, empData.empCode], (err, data, fields) => {
        if (err) throw err;
        data.forEach(element => {
            if (element.costructor == Array) {
                return res.send({
                    message: 'Inserted Employee Emp id is ' + element[0].empId
                })
            }
        });
        return res.status(200).send({
            message: 'Data has been added.',
            // data,
            // fields
        });
    });
})

// update employee
app.put('/updateEmployee', async (req, res) => {
    let empData = req.body;
    console.log(empData);
    let sqlQuery = `SET @empId = ?; SET @name = ?; SET @salary = ?;SET @empCode = ?;
    CALL employeeAddOrEdit(@empId, @name, @salary, @empCode);`;
    connect.query(sqlQuery, [empData.empId, empData.name, empData.salary, empData.empCode], (err, data, fields) => {
        if (err) throw err;
        data.forEach(element => {
            if (element.costructor == Array) {
                return res.send({
                    message: 'Inserted Employee Emp id is ' + element[0].empId
                })
            }
        });
        return res.status(200).send({
            message: 'Data has been updated.',
            // data,
            // fields
        });
    });
})