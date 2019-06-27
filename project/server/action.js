const low = require('lowdb');
const nanoid = require('nanoid/generate');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const state = { houses: [] };
const getDb = db.get('houses');
db.defaults(state).write();
const housesData = getDb.value();

const add = (owner, rooms, price, country, city, photo) =>
  getDb.push({ id: nanoid('1234567890', 3), owner, rooms, price, country, city, photo }).write();

const getOne = id => getDb.find({ id }).value();

const remove = id => getDb.remove({ id }).write();

const addItem = (req, res) => {
  const { owner, rooms, price, photo } = req.body;
  !owner || !rooms || !price || !country || !city || !photo
    ? res.status(400).json('missing or invalid house details')
    : res.status(201).json(add(owner, rooms, price, country, city, photo));
};

const getItem = (req, res) => {
  getOne(req.params.id)
    ? res.status(206).json(getOne(req.params.id))
    : res.status(400).json('no houses with this id');
};

const deleteItem = (req, res) => {
  getOne(req.params.id)
    ? res.status(200).json(remove(req.params.id) && getDb.value())
    : res.status(400).json('no houses with this id');
};

module.exports = { addItem, getItem, deleteItem, db, housesData };
