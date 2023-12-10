const dbClient = require('./db_client');

async function get(id) {
    const record = await dbClient.query(
        `SELECT * FROM accounts WHERE id = ?`,
        [id]
    );

    return record;
};

async function saveAccount (name, email, hash) {
    const sql = 'insert into account (name, email, password) values (?, ?, ?)'
    const params = [name, email, hash]
    try {
        return dbClient.query(sql, params)
    }
    catch (err) {
        return err
    }
}

async function login (email) {
    const sql = 'select * from account where email = ?'
    const params = [email]
    return dbClient.query(sql, params)
}

module.exports = {
    get, saveAccount, login
}