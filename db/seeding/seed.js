/* eslint-disable no-console */
const { Pool } = require('pg');

const pool = new Pool({
  host: '3.138.137.91',
  user: 'paula',
  database: 'attractionShowcase',
  password: 'azsxdc',
  port: 5432,
});

const createShowcaseTable = `CREATE TABLE IF NOT EXISTS showcase(
  attractionId SERIAL PRIMARY KEY,
  attractionTitle TEXT,
  city TEXT,
  reviews INTEGER,
  relativeRanking1 INTEGER,
  relativeRanking2 INTEGER,
  ratio DECIMAL,
  attractionType TEXT,
  description TEXT,
  isOpen BOOLEAN,
  suggestedDuration INTEGER,
  address TEXT,
  travelersChoiceAward BOOLEAN,
  likedStatus BOOLEAN,
  ticketPrice INTEGER,
  averageRating DECIMAL
)`;

const createImproveFormTable = `CREATE TABLE IF NOT EXISTS improveForm (
  suggestionId SERIAL PRIMARY KEY,
  attractionId INTEGER REFERENCES showcase(attractionId),
  description TEXT,
  isOpen BOOLEAN,
  suggestedDuration INTEGER,
  address TEXT
)`;

const createPicturesTable = `CREATE TABLE IF NOT EXISTS pictures (
  pictureId SERIAL PRIMARY KEY,
  attractionId INTEGER REFERENCES showcase(attractionId),
  imageUrl TEXT
)`;

pool.connect((err, client, done) => {
  client.query('DROP TABLE IF EXISTS showcase CASCADE')
    .then(() => client.query('DROP TABLE IF EXISTS improveForm CASCADE'))
    .then(() => client.query('DROP TABLE IF EXISTS pictures CASCASE'))
    .then(() => client.query(createShowcaseTable))
    .then(() => client.query(createImproveFormTable))
    .then(() => client.query(createPicturesTable))
    .then(done)
    .catch((error) => {
      console.log(error);
    });
});
