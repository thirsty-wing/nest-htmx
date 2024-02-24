import pg from 'pg';
const { Client } = pg;

const client = new Client({
  user: 'myuser',
  host: 'localhost',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

await client.connect();

console.log(await client.query('SELECT NOW()'));

await client.end();
