const {
    createPool
} = require('mysql');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'welcome$1234',
    database: 'test',
    connectionLimit: 10
});

module.exports = pool;