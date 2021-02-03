DROP DATABASE IF EXISTS attractionShowcase;

CREATE DATABASE attractionShowcase;

\c attractionShowcase;

CREATE TABLE IF NOT EXISTS showcase (
  attractionId SERIAL PRIMARY KEY,
  attractionTitle TEXT,
  city TEXT,
  reviews INTEGER,
  relativeRanking ARRAY,
  ratio INTEGER,
  attrationType TEXT,
  description TEXT,
  isOpen BOOLEAN,
  suggestedDuration INTEGER,
  address TEXT,
  imageUrl TEXT,
  travelersChoiceAward BOOLEAN,
  linkedStatus BOOLEAN,
  ticketPrice INTEGER,
  averageRating INTEGER
)

CREATE TABLE IF NOT EXISTS improveForm (
  id SERIAL PRIMARY KEY,
  attractionId INTEGER REFERENCES showcase(attractionId),
  description TEXT,
  isOpen BOOLEAN,
  suggestedDuration INTEGER,
  address TEXT
)

