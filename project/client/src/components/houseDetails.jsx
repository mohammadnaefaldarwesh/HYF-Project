import React from 'react';

class HouseDetails extends React.Component {
  state = {
    house: [],
    loading: true,
    error: null,
  };
  componentDidMount() {
    let id = this.props.match.params.id;
    fetch(`http://localhost:5000/api/houses/${id}`)
      .then(res => res.json())
      .then(house => {
        this.setState({
          house,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ error: 'fetching data failed', loading: false });
      });
  }
  render() {
    const { error, house, loading } = this.state;
    if (loading) return <p className="error-loading">Loading...</p>;
    if (error) return <p className="error-loading">ERROR: {error}</p>;
    if (house) {
      return (
        <div>
          {house.map(house => (
            <div className="single-house-card" key={house.id}>
              <img className="single-house-img" src={house.images} alt="house" />
              <ul>
                <li className="single-house-info">
                  <strong>link : </strong>
                  {house.link}
                </li>
                <li className="single-house-info">
                  <strong>market date : </strong>
                  {house.market_date}
                </li>
                <li className="single-house-info">
                  <strong>country : </strong>
                  {house.location_country}
                </li>
                <li className="single-house-info">
                  <strong>city: </strong>
                  {house.location_city}
                </li>
                <li className="single-house-info">
                  <strong>address :</strong> {house.location_address}
                </li>
                <li className="single-house-info">
                  <strong>size living area : </strong>
                  {house.size_living_area}
                </li>
                <li className="single-house-info">
                  <strong>size rooms: </strong>
                  {house.size_rooms}
                </li>
                <li className="single-house-info">
                  <strong>price : </strong>
                  {house.price_value} {house.price_currency}
                </li>
                <li className="single-house-info">
                  <strong>location lat: </strong>
                  {house.location_coordinates_lat}
                </li>
                <li className="single-house-info">
                  <strong>location lng: </strong>
                  {house.location_coordinates_lng}
                </li>
                <li className="single-house-info">
                  <strong>description: </strong>
                  {house.description}
                </li>
                <li className="single-house-info">
                  <strong>title: </strong>
                  {house.title}
                </li>
                <li className="single-house-info">
                  <strong>sold: </strong>
                  {house.sold === 1 ? 'YES' : 'NO'}
                </li>
              </ul>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default HouseDetails;
