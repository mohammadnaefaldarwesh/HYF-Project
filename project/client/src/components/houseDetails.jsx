import React from 'react';

class HouseDetails extends React.Component {
  state = {
    house: {},
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
    const { owner, rooms, price, photo, country, city } = this.state.house;
    const { error, house, loading } = this.state;
    if (loading) return <p className="error-loading">Loading...</p>;
    if (error) return <p className="error-loading">ERROR: {error}</p>;
    if (house) {
      return (
        <div className="single-house-card">
          <img className="single-house-img" src={photo} alt="house" />
          <ul>
            <li className="single-house-info">
              <strong>Owner : </strong>
              {owner}
            </li>
            <li className="single-house-info">
              <strong>Rooms : </strong>
              {rooms}
            </li>
            <li className="single-house-info">
              <strong>Price : </strong>
              {price}
            </li>
            <li className="single-house-info">
              <strong>Country: </strong>
              {country}
            </li>
            <li className="single-house-info">
              <strong>City :</strong> {city}
            </li>
          </ul>
          <br />
        </div>
      );
    }
  }
}

export default HouseDetails;
