const express = require('express');
const api = express.Router();
const { getItem, deleteItem, housesData, addHouses } = require('./action');

api.route('/', (req, res) => res.end('api home'));

api
  .route('/houses')
  .get((req, res) => {
    housesData.length > 0 ? res.json(housesData) : res.send('empty database');
  })
  .post(addHouses);

api
  .route('/houses/:id')
  .get(getItem)
  .delete(deleteItem);

api.use((req, res) => {
  res.status(400).end('unsupported request');
});

module.exports = api;
