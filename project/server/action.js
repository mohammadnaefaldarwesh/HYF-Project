const { validateInput, houseData, responseMessage } = require('./validator');
const { queryPromise } = require('./dbConnection');
const validator = require('validator');

const getHouses = async (req, res) => {
  let {
    size_rooms = '',
    price_min = 0,
    price_max = 1000000,
    sort = 'location_country_asc',
    location_country = '',
    page = 1,
  } = req.query;

  const index = sort.lastIndexOf('_');
  let sort_direction, sort_field;

  if (index > 0) {
    sort_field = sort.slice(0, index);
    sort_direction = sort.slice(index + 1);
    if (['asc', 'desc'].indexOf(sort_direction) === -1) {
      return res.status(400).json({
        error: `incorrect ${sort} params`,
      });
    }
  } else {
    return res.status(400).json({
      error: `incorrect ${sort} params`,
    });
  }

  price_min = parseInt(price_min, 10);
  size_rooms = parseInt(size_rooms, 10);
  price_max = parseInt(price_max, 10);
  page = parseInt(page, 10);

  const conditions = [`(price_value between ? and ?)`];
  const params = [price_min, price_max];

  location_country.length
    ? conditions.push(`location_country = ?`) && params.push(location_country)
    : null;

  size_rooms === 4
    ? conditions.push(`size_rooms >= ?`) && params.push(size_rooms)
    : size_rooms > 0
    ? conditions.push(`size_rooms = ?`) && params.push(size_rooms)
    : null;

  const queryBody = `from houses where ${conditions.join(' and ')}`;
  const queryItems = `select * ${queryBody}
  order by ${sort_field} ${sort_direction}`;

  !validator.isInt(price_min + '', { min: 0 })
    ? res.status(400).json({
        error: `Price_min must be positive number !!! `,
      })
    : size_rooms <= 0
    ? res.status(400).json({
        error: `size_rooms must be positive number  !!! `,
      })
    : !validator.isInt(price_max + '', { min: 0 })
    ? res.status(400).json({
        error: `price_max must be positive number  !!! `,
      })
    : price_max < price_min
    ? res.status(400).json({
        error: `price_min must be less than price_max `,
      })
    : !validator.isInt(page + '', { min: 1 })
    ? res.status(400).json({
        error: `page must be 1 or more  !!! `,
      })
    : await queryPromise(queryItems, params, (err, result) =>
        err ? res.status(400).json({ error: error.message }) : res.json(result),
      );
};

const getOnehouse = async (req, res) =>
  await queryPromise(`select * from houses where id = ?`, req.params.id, (error, results) => {
    error ? res.sendStatus(500) : res.status(200) && res.json(results);
  });

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

  let validatedData = data.map(houseObj => validateInput(houseObj));

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

  const sqlDataRaw = validHouses.map(item => houseData(item.rawData));

  if (validHouses.length) {
    (async function createData() {
      try {
        await queryPromise(addHouse, [sqlDataRaw]);
        return res.json(report);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    })();
  } else res.send(report);
};

module.exports = {
  addHouses,
  getOnehouse,
  getHouses,
};
