const { Pool } = require('pg');

const pool = new Pool({
  host: '3.138.137.91',
  user: 'paula',
  database: 'attractionShowcase',
  password: 'azsxdc',
  port: 5432,
});

module.exports = {
  pool: () => pool,
};
