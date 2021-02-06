/* eslint-disable no-console */
const express = require('express');
const { pool } = require('../db/index.js');

const showcase = express.Router();

showcase.get('/api/showcase', async (req, res) => {
  try {
    const { rows } = await pool().query('SELECT * FROM showcase WHERE attractionId = 13');
    const images = await pool().query('SELECT * FROM pictures WHERE attractionId = 13');
    const imageUrls = [];
    images.rows.forEach((row) => {
      imageUrls.push(row.imageurl);
    });
    const data = [{
      attractionId: rows[0].attractionid,
      city: rows[0].city,
      reviews: rows[0].reviews,
      relativeRanking: [rows[0].relativeranking1, rows[0].relativeranking2],
      ratio: rows[0].ratio,
      attractionType: rows[0].attractiontype,
      overview: {
        description: rows[0].description,
        isOpen: rows[0].isOpen,
        suggestedDuration: rows[0].suggestedduration,
        address: rows[0].address,
      },
      imageUrl: imageUrls,
      travelersChoiceAward: rows[0].travelerschoiceaward,
      linkedStatus: rows[0].linkedstatus,
      averageRating: Number(rows[0].averagerating),
    }];
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

showcase.get('/api/showcase/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool().query(`SELECT * FROM showcase WHERE attractionId = ${id}`);
    const images = await pool().query(`SELECT * FROM pictures WHERE attractionId = ${id}`);
    const imageUrls = [];
    images.rows.forEach((row) => {
      imageUrls.push(row.imageurl);
    });
    const data = [{
      attractionId: rows[0].attractionid,
      city: rows[0].city,
      reviews: rows[0].reviews,
      relativeRanking: [rows[0].relativeranking1, rows[0].relativeranking2],
      ratio: rows[0].ratio,
      attractionType: rows[0].attractiontype,
      overview: {
        description: rows[0].description,
        isOpen: rows[0].isOpen,
        suggestedDuration: rows[0].suggestedduration,
        address: rows[0].address,
      },
      imageUrl: imageUrls,
      travelersChoiceAward: rows[0].travelerschoiceaward,
      likedStatus: rows[0].likedstatus,
      averageRating: rows[0].averagerating,
    }];
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

showcase.post('/api/showcase/:attractionId', async (req, res) => {
  try {
    const { attractionId } = req.params;
    const {
      description, isOpen, suggestedDuration, address,
    } = req.body.form;
    const query = `INSERT INTO improveForm(attractionId, description, isOpen, suggestedDuration, address) VALUES (${attractionId}, '${description}', ${isOpen}, ${suggestedDuration}, '${address}')`;
    pool().query(query)
      .then(() => {
        res.status(201).send({
          message: 'Thank you! Your suggestions have been received. We will look into this and make changes as appropriate',
        });
      })
      .catch((err) => res.status(406).send(err.message));
  } catch (err) {
    res.status(406).send(err.message);
  }
});

showcase.patch('/api/showcase/like/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `UPDATE showcase SET likedStatus = true WHERE attractionId = ${id}`;
    pool().query(query)
      .then(() => res.status(201).send('Updated likedStatus'))
      .catch(() => res.status(400).send('Error Patching liked status'));
  } catch (err) {
    res.status(400).send('Error Patching liked status');
  }
});

module.exports = showcase;
