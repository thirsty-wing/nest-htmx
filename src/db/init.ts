import { Client } from 'pg';

const client = new Client({
  user: 'myuser',
  host: 'localhost',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

client.connect((err) => {
  client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message); // Hello World!
    client.end();
  });
});
