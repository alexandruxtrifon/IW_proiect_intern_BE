const sql = require('mssql');

const config = {
    server: 'DATASRV\\SQL2019',
    user: 'user_internship2024',
    password: 'CdSnqP9Y`%8ZE!>@D?',
    instancename: 'SQLEXPRESS',
    options: {
        database: 'internship2024',
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
.connect().then(pool => {
    console.log('S-a stabilit conexiunea la SQL');
    return pool;
})
.catch(err => {
    console.error('Conexiunea la SQL Server a esuat');
    process.exit(1);
});

module.exports = {sql, poolPromise};