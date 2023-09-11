//db configurations for MSSQL

const sql = require('mssql');

const config = {
  user: 'TheSpaceDemo',
  password: 'spacin0u+',
  server: '(localdb)\\MSSQLLocalDB',
  database: 'TheSpace',
  options: {
    enableArithAbort: true,
  },
};

const pool = new sql.ConnectionPool(config);

module.exports = pool;