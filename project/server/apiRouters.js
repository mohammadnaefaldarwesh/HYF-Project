const express = require('express');
const api = express.Router();
const { addItem, getItem, deleteItem, housesData } = require('./action');

api.get('/', (req, res) => {
  res.end('api home');
});

api.get('/houses', (req, res) => {
  housesData.length > 0 ? res.json(housesData) : res.send('empty database');
});

api.post('/houses', addItem);
api.get('/houses/:id', getItem);
api.delete('/houses/:id', deleteItem);

api.use((req, res) => {
  res.status(400).end('unsupported request');
});

module.exports = api;
