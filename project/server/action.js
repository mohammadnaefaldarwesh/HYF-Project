const low = require('lowdb');
const nanoid = require('nanoid/generate');
const FileSync = require('lowdb/adapters/FileSync');
const { validateInput, houseData, responseMessage } = require('./validator');
const { queryPromise } = require('./dbConnection');
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

const addHouse = `
INSERT INTO Houses (
  link,
  market_date,
  location_country,
  location_city,
  location_address,
  size_living_area,
  size_rooms,
  price_value,
  location_coordinates_lat,
  location_coordinates_lng,
  price_currency,
  description,
  title,
  images,
  sold
) VALUES ?
`;

let validHouses = [];
let invalidHouses = [];
let errors = [];

const addHouses = (req, res) => {
  let data = req.body;
  if (!Array.isArray(data)) {
    res.status(400).json({ error: 'Data must be an array' });
  }

  let validatedData = data.map(house => validateInput(house));

  validatedData.forEach(house =>
    house.valid ? validHouses.push(house) : invalidHouses.push(house),
  );

  invalidHouses.forEach(item => errors.push(item.errors));

  const report = {
    validHouses,
    invalidHouses,
    responseMessage,
    errors,
  };

  const houseInfo = validHouses.map(item => houseData(item.rawData));

  if (validHouses.length) {
    (async function createData() {
      try {
        await queryPromise(addHouse, [houseInfo]);
        return res.json(report);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    })();
  } else res.send(report);
};

module.exports = { getItem, deleteItem, db, housesData, addHouses };
