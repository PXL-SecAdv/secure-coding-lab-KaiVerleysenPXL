const pg = require('pg');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt')

const port=3000;
require('dotenv').config();

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: 'db',
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: 5432,
    connectionTimeoutMillis: 5000
})

console.log("Connecting...:")

const corsOptions = {
  origin: "http://localhost:8080"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/authenticate/:username/:password', async (request, response) => {
    const username = request.params.username;
    const password = request.params.password;

    // og: const query = `SELECT * FROM users WHERE user_name='${username}' and password='${password}'`;
    const query = 'SELECT * FROM users WHERE user_name = $1'
    console.log(query);
    // og: pool.query(query, (error, results) => {
    pool.query(query, [username], async (error, results) => {
      if (error) {
        throw error
      }
      // inkomend paswoord vergelijken met opgeslagen hash:
      const passwordIsValid = await bcrypt.compare(password, results.rows[0].password)
      if (passwordIsValid) {
        response.status(200).json(results.rows);
      }
})});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

