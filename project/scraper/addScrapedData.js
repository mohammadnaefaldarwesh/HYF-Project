const { queryPromise } = require('../server/dbConnection');
const { validateInput, houseData, responseMessage } = require('../server/validator');
const fs = require('fs');

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

const addHouses = data => {
  if (!Array.isArray(data)) {
    console.log({ error: 'Data must be an array' });
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
        return console.log(report);
      } catch (error) {
        return console.log({ error: error.message });
      }
    })();
  } else console.log(report);
};

const addScrapedData = async () => {
  await fs.readFile('./scrapedData.json', (err, results) => {
    addHouses(JSON.parse(results));
  });
};

addScrapedData();
