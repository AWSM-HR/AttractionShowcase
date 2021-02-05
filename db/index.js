const { Pool } = require('postgres');

const pool = new Pool({
  host: 'localhost',
  user: 'Paula',
  database: 'attractionShowcase';
  password: '',
  port: 5432,
});

const findAll = (id, cb) => {
  pool.query(`SELECT * FROM review WHERE destination = ${id}`, (err, { rows }) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, rows);
    }
  });
};

const create = (arr, cb) => {
  const
}

module.exports = {
  pool,
  findAll,
  create,
  remove,
};
