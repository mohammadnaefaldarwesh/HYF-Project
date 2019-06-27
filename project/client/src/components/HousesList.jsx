import React from 'react';
import { Link } from 'react-router-dom';

class HouseList extends React.Component {
  state = {
    houses: [],
    loading: true,
    error: null,
  };
  componentDidMount() {
    fetch(`http://localhost:5000/api/houses/`)
      .then(res => res.json())
      .then(houses => {
        this.setState({
          houses,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ error: 'fetching data failed', loading: false });
      });
  }

  render() {
    const { houses, error, loading } = this.state;
    if (error) {
      return <p className="error-loading">{error}</p>;
    }
    if (loading) {
      return <p className="error-loading">Loading...</p>;
    }
    return (
      <div className="houses-list">
        {houses.map(house => (
          <Link key={house.id} to={`/houses/${house.id}`}>
            <div className="house-card">
              <div className="card-img">
                <img className="card-img" src={house.photo} alt="house" />
              </div>
              <ul>
                <li>
                  <strong> Rooms : </strong>
                  {house.rooms}
                </li>
                <li>
                  <strong> Country :</strong> {house.country}
                </li>
                <li>
                  <strong> City : </strong>
                  {house.city}
                </li>
              </ul>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default HouseList;
