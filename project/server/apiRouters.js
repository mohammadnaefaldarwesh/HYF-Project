const express = require('express');
const api = express.Router();
const { addHouses, getOnehouse, getHouses } = require('./action');

api.route('/', (req, res) => res.end('api home'));

api
  .route('/houses')
  .get((req, res) => {
    req ? getHouses(req, res) : res.send('something went wrong');
  })
  .post(addHouses);

api.route('/houses/:id').get(getOnehouse);

api.use((req, res) => {
  res.status(400).end('unsupported request');
});

module.exports = api;
