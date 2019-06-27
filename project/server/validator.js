const validator = require('validator');
const validate = require('validate.js');

const allFields = [
  'link',
  'market_date',
  'location_country',
  'location_city',
  'location_address',
  'size_living_area',
  'size_rooms',
  'price_value',
  'location_coordinates_lat',
  'location_coordinates_lng',
  'price_currency',
  'description',
  'title',
  'images',
  'sold',
];

let requiredFields = [
  'link',
  'location_country',
  'location_city',
  'size_living_area',
  'size_rooms',
  'price_value',
  'price_currency',
];

let responseMessage = ['failed !'];

const validateInput = newHouse => {
  let valid = false;
  let errors = [];
  let {
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
    sold,
  } = newHouse;

  const isStringList = [
    link,
    market_date,
    location_country,
    location_city,
    location_address,
    description,
    title,
    images,
    price_currency,
  ];

  requiredFields.forEach(field => {
    if (validate.isEmpty(newHouse[field]) || !validate.isDefined(newHouse[field])) {
      errors.push(` ${field} is required !`);
    }
  });

  isStringList.forEach(field => {
    if (!validate.isString(field)) {
      errors.push(`${field} must be string !`);
    }
  });

  const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'CHF', 'CAD', 'AUD', 'HKD'];

  let imgValidation = (images = images.split(','));
  images.forEach((img, i) => {
    if (!validator.isURL(img)) errors.push(`image number ${i + 1} is not valid `);
  });

  !validate.isObject(newHouse) || validate.isEmpty(newHouse)
    ? errors.push('The input must be an object and not empty !')
    : !validator.isURL(link)
    ? errors.push(` Invalid URL`)
    : !validator.isISO8601(market_date + '') || !validator.isBefore(market_date)
    ? errors.push(
        'market_date is not correct date. It must be [YYYY] - [MM] - [DD] and must be before today.',
      )
    : !validator.isNumeric(location_coordinates_lat + '') ||
      !validator.isNumeric(location_coordinates_lng + '')
    ? errors.push('invalid lat/lng')
    : validate.isEmpty(location_address) ||
      (validate.isEmpty(location_coordinates_lat) && validate.isEmpty(location_coordinates_lng))
    ? error.push(
        'location_address or location_coordinates_lat & location_coordinates_lng must be filled.',
      )
    : !validator.isFloat(location_coordinates_lat + '') ||
      !validator.isFloat(location_coordinates_lng + '')
    ? errors.push('location_coordinates_lat & location_coordinates_lng must be a float number')
    : !validator.isInt(size_living_area + '') ||
      (size_living_area < 0 && Math.sqrt(size_living_area) % 1 !== 0)
    ? errors.push('size_living_area must be integer and in square meters')
    : !validator.isInt(size_rooms + '')
    ? errors.push('size_rooms must be integer')
    : !validator.isFloat(price_value + '') || !validator.isNumeric(price_value + '')
    ? errors.push(`price_value must be a float number`)
    : !currencies.includes(price_currency)
    ? errors.push(`price_currency must be valid currency`)
    : !validator.isInt(sold + '', { min: 0, max: 1 })
    ? errors.push(`sold must be 0 or 1`)
    : imgValidation == false
    ? imgValidation
    : errors.length
    ? errors.push(`fix the errors !`)
    : ((valid = true), responseMessage.splice(0, responseMessage.length, 'Success !'));

  return {
    valid,
    errors,
    responseMessage,
    rawData: newHouse,
  };
};

const houseData = newHouse => allFields.map(field => newHouse[field]);

module.exports = { validateInput, houseData, responseMessage };
