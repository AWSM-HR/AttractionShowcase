/* eslint-disable no-console */
const express = require('express');
const { findOne } = require('../db/index.js');

const showcase = express.Router();

showcase.get('/api/showcase/:id', (req, res) => {
  findOne(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// showcase.get('/api/showcase/:id', (req, res) => {
//   const { id } = req.params;

//   ShowCase.findById(id)
//     .then((data) => res.status(200).send(data))
//     .catch(() => {
//       res.status(400).send('Error Getting by Id');
//     });
// });

// showcase.post('/api/showcase/:attractionId', (req, res) => {
//   const { form } = req.body;
//   const { attractionId } = req.params;
//   const obj = { ...form, attractionId };

//   postForm(obj, (err) => {
//     if (err) res.status(406).send(err.message);
//     else {
//       res.status(201).send({
//         message: 'Thank You! Your suggestions have been received.  We will look into this and make changes as appropriate',
//       });
//     }
//   });
// });

// showcase.patch('/api/showcase/like/:id', (req, res) => {
//   const { id } = req.params;
//   const { likedStatus } = req.body;
//   if (typeof likedStatus !== 'boolean') {
//     res.status(400).send('likedStatus must be a boolean');
//     return;
//   }
//   ShowCase.findByIdAndUpdate(id, { likedStatus },
//     { new: true, useFindAndModify: false })
//     .then((data) => res.status(200).send(data))
//     .catch(() => {
//       res.status(400).send('Error Patching liked status');
//     });
// });

module.exports = showcase;
