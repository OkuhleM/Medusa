const { Pool } = require('pg');

const userDataBase = new Pool({
    user: 'app_user',
    host: 'localhost',
    database: 'medusa_form',
    password: 'Lindokuhle22',
    port: 5432,
  })
  userDataBase.connect()
module.exports = { userDataBase };