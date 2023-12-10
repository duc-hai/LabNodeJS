var mysql = require('mysql2/promise');
var dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'file_management'
};

async function query(sql, params) {
  try {
    var con = await mysql.createConnection(dbConfig);
    const [results,] = await con.execute(sql, params);
    return results;
  }
  catch (err) {
    return err
  }
}

module.exports = {
  query
}