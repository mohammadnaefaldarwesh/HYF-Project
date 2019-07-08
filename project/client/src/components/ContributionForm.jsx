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
    const { isLoaded, errLoaded } = this.state;

    return (
      <div className="all-form">
        <form className="input-form" />
        <form className="contribution-form">
          <textarea
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
        {isLoaded || errLoaded ? <Report data={this.state} /> : null}
      </div>
    );
  }
}
export default Contribute;
