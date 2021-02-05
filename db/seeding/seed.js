/* eslint-disable no-console */
const { Pool } = require('postgres');

const pool = new Pool({
  host: 'localhost',
  user: 'Paula',
  database: 'reviews',
  password: '',
  port: 5432,
});

const createShowcaseTable = `CREATE TABLE IF NOT EXISTS showcase(
  attractionId SERIAL PRIMARY KEY,
  attractionTitle TEXT,
  city TEXT,
  reviews INTEGER,
  relativeRanking ARRAY,
  ratio INTEGER,
  attractionType TEXT,
  description TEXT,
  isOpen BOOLEAN,
  suggestedDuration INTEGER,
  address TEXT,
  travelersChoiceAward BOOLEAN,
  linkedStatus BOOLEAN,
  ticketPrice INTEGER,
  averageRating INTEGER
)`;

const createImproveFormTable = `CREATE TABLE IF NOT EXISTS improveForm (
  suggestionId SERIAL PRIMARY KEY,
  atttractionID INTEGER REFERENCES showcase(attractionId),
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
    .then(() => client.query('DROP TABLE IF EXISTS improveForm'))
    .then(() => client.query('DROP TABLE IF EXISTS pictures'))
    .then(() => client.query(createShowcaseTable))
    .then(() => client.query(createImproveFormTable))
    .then(() => client.query(createPicturesTable))
    .then(done)
    .catch((error) => {
      console.log(error);
    });
});
