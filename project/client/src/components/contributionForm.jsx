import React from 'react';
import Report from './Report';
class Contribute extends React.Component {
  state = {
    errors: [],
    report: [],
    isLoaded: false,
    errLoaded: false,
    link: '',
    market_date: '',
    location_country: '',
    location_city: '',
    location_address: '',
    size_living_area: '',
    size_rooms: '',
    price_value: '',
    price_currency: '',
    location_coordinates_lat: '',
    location_coordinates_lng: '',
    description: '',
    title: '',
    images: '',
    sold: '',
  };

  onSubmit = event => {
    event.preventDefault();
    fetch(`http://localhost:5000/api/houses`, {
      method: 'POST',
      body: this.HouseInput.value,
      headers: { 'content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        data.error
          ? this.setState({ errors: data.error, report: data, errLoaded: true })
          : this.setState({ report: data, isLoaded: true });
      })
      .catch(error => this.setState({ errors: error.message }));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      isLoaded,
      link,
      market_date,
      location_country,
      location_city,
      location_address,
      size_living_area,
      size_rooms,
      price_value,
      price_currency,
      location_coordinates_lat,
      location_coordinates_lng,
      description,
      title,
      images,
      sold,
    } = this.state;

    const inputArray = [
      'link',
      'market_date',
      'location_country',
      'location_city',
      'location_address',
      'size_living_area',
      'size_rooms',
      'price_value',
      'price_currency',
      'location_coordinates_lat',
      'location_coordinates_lng',
      'description',
      'title',
      'images',
      'sold',
    ];

    const validHouse = `[{
    "link": ${link},
    "market_date":${market_date},
    "location_country": ${location_country},
    "location_city":${location_city},
    "location_address":${location_address},
    "size_living_area":${size_living_area},
    "size_rooms": ${size_rooms},
    "price_value":${price_value},
    "price_currency": ${price_currency},
    "location_coordinates_lat": ${location_coordinates_lat},
    "location_coordinates_lng": ${location_coordinates_lng},
    "description":${description},
    "title":${title},
    "images":${images},
    "sold":${sold}
    }]`;

    return (
      <div className="all-form">
        <form className="input-form">
          {inputArray.map((item, index) => {
            return (
              <div className="input-items" key={index}>
                <label>{item + ':'}</label>
                <input
                  key={index}
                  type="text"
                  value={eval(item)}
                  name={item}
                  placeholder={item}
                  onChange={this.handleChange}
                />
              </div>
            );
          })}
        </form>
        <form className="contribution-form">
          <textarea
            value={validHouse}
            className="contribution-textarea"
            placeholder="  insert houses info:"
            ref={elem => {
              this.HouseInput = elem;
            }}
          />
          <button
            className="contribution-button"
            type="submit"
            value="submit"
            onClick={this.onSubmit}
          >
            Add house
          </button>
        </form>
        {isLoaded ? <Report data={this.state} /> : null}
      </div>
    );
  }
}
export default Contribute;
