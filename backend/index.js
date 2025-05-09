const pg = require('pg');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt')

const port=3000;

const pool = new pg.Pool({
    user: 'secadv',
    host: 'db',
    database: 'pxldb',
    password: 'ilovesecurity',
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

    // const query = `SELECT * FROM users WHERE user_name='${username}' and password='${password}'`;
    const query = 'SELECT * FROM users WHERE user_name = $1'

    console.log(query);
    // pool.query(query, (error, results) => {
    pool.query(query, [username], async (error, results) => {
      if (error) {
        throw error
      }
      // response.status(200).json(results.rows)});
      const passwordIsValid = await bcrypt.compare(password, results.rows[0].password)
      if (passwordIsValid) {
        response.status(200).json(results.rows);
      }});
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

