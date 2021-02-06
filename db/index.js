const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: '',
  database: 'attractionShowcase',
  password: '',
  port: 5432,
});

module.exports = {
  pool: () => pool,
};


// const findOne = (id, cb) => {
//   pool.query(`SELECT * FROM showcase WHERE attractionId = ${id}`, (err, data) => {
//     if (err) {
//       cb(err, null);
//     } else {
//       cb(null, data);
//     }
//   });
// };

// module.exports = {
//   findOne,
// };