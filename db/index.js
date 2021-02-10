const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'Paula',
  database: 'attractionShowcase',
  password: 'azsxdc',
  port: 5432,
});

module.exports = {
  pool: () => pool,
};
