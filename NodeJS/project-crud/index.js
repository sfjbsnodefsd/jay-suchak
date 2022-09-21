const mySql = require('mysql')
const express = require('express')
const app = express();

app.use(express.json());

const connect = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'welcome$1234',
    database: 'employeedb'
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
        console.log(fields);
        return res.send(data);
    });
})

// get by id
app.get('/getEmp/:id', async (req, res) => {
    connect.query(`select * from employeedata where empId=${req.params.id}`, (err, data, fields) => {
        if (err) throw err;
        console.log(fields);
        return res.send(data);
    });
})

// delete by id
app.delete('/getEmp/:id', async (req, res) => {
    connect.query(`delete from employeedata where empId=${req.params.id}`, (err, data, fields) => {
        if (err) throw err;
        console.log(fields);
        return res.send(data);
    });
})