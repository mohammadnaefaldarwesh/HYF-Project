const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

request('http://www.eurobrix.com/property/townhouse/', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    let houses = [];

    $('.listing-div').each((i, el) => {
      let object = {};
      const houseInfo = $(el)
        .find('p')
        .text()
        .replace(/\s\s+/g, '');

      let link = $(el)
        .find('a')
        .attr('href');
      object.link = `http://www.eurobrix.com${link}`;

      object.market_date = new Date().toISOString().slice(0, 10);

      object.location_country = houseInfo.slice(23, 39).replace(/€|,|1|2|3|4|5|0|6|7|8|9| |/g, '');
      object.location_country === ''
        ? (object.location_country = 'italy')
        : object.location_country;

      object.location_city = houseInfo
        .slice(15, 23)
        .replace(/€|,|74|99|47/g, '')
        .replace(/italy/, '---');

      object.location_address = '---';

      object.size_living_area = Math.floor(Math.random() * 300 + 50);

      object.size_rooms = houseInfo.slice(0, 1);

      object.price_value = houseInfo
        .slice(20, 50)
        .replace(/,/g, '')
        .slice(-6);

      object.price_currency = 'EUR';

      object.location_coordinates_lat = Math.floor(Math.random() * 100 + 20);
      object.location_coordinates_lng = Math.floor(Math.random() * 100 + 50);

      object.description = houseInfo.slice(6, 15);

      object.title = houseInfo.slice(6, 15);

      object.images = $(el)
        .find('img')
        .attr('src');

      object.sold = 0;
      houses.push(object);
      return houses;
    });
    fs.appendFile('scrapedData.json', JSON.stringify(houses, null, 2), function(err) {
      if (err) throw err;
    });
  }
});
