import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

class HouseList extends React.Component {
  state = {
    houses: [],
    loading: true,
    error: null,
    activePage: 1,
    perPage: 4,
    searchCriteria: {
      size_rooms: '',
      price_min: '0',
      price_max: '100000',
      sort: 'location_country_asc',
      location_country: '',
      page: 1,
    },
  };

  componentDidMount() {
    const { searchCriteria } = this.state;
    const queryString = Object.keys(searchCriteria)
      .reduce((query, field) => {
        const value = searchCriteria[field];
        if (value !== null && value !== ' ') {
          query.push(`${field}=${encodeURI(value)}`);
        }
        return query;
      }, [])
      .join('&');
    this.props.history.replace(this.props.location.pathname + '?' + queryString);
    return fetch(`http://localhost:5000/api/houses?${queryString}`)
      .then(res => res.json())
      .then(houses => {
        this.setState({
          houses,
          error: null,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ error: 'fetching data failed', loading: false });
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { searchCriteria } = this.state;
    const queryString = Object.keys(searchCriteria)
      .reduce((query, field) => {
        const value = searchCriteria[field];
        if (value !== null && value !== ' ') {
          query.push(`${field}=${encodeURI(value)}`);
        }

        return query;
      }, [])
      .join('&');
    this.props.history.replace(this.props.location.pathname + '?' + queryString);
    return fetch(`http://localhost:5000/api/houses?${queryString}`)
      .then(res => res.json())
      .then(houses => {
        this.setState({
          houses,
          error: null,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          error: 'fetching data failed',
          loading: false,
        });
      });
  };

  HandleValueChange = event => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      searchCriteria: {
        ...this.state.searchCriteria,
        [name]: value,
      },
    });
  };

  handlePageChange = pageNumber => {
    const newPage = this.state.searchCriteria;
    newPage.page = pageNumber;
    if (newPage.page > this.state.houses.length) {
      pageNumber = Math.ceil(this.state.houses.length / 4);
    }
    this.setState({ activePage: pageNumber, newPage });
    const { searchCriteria } = this.state;
    const queryString = Object.keys(searchCriteria)
      .reduce((query, field) => {
        const value = searchCriteria[field];
        if (value !== null && value !== ' ') {
          query.push(`${field}=${encodeURI(value)}`);
        }

        return query;
      }, [])
      .join('&');
    this.props.history.replace(this.props.location.pathname + '?' + queryString);
    return fetch(`http://localhost:5000/api/houses?${queryString}`)
      .then(res => res.json())
      .then(houses => {
        this.setState({
          houses,
          error: null,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          error: 'fetching data failed',
          loading: false,
        });
      });
  };

  render() {
    const {
      houses,
      error,
      loading,
      perPage,
      activePage,
      searchCriteria: { size_rooms, price_min, price_max, sort, country, page },
    } = this.state;

    const indexOfLastPost = page * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const currentPosts = houses.slice(indexOfFirstPost, indexOfLastPost);

    if (error) {
      return <p className="error-loading">{error}</p>;
    }
    if (loading) {
      return <p className="error-loading">Loading...</p>;
    }
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit} className="filter-form">
            <div>
              <label className="label">country: </label>
              <select name="location_country" value={country} onChange={this.HandleValueChange}>
                <option value="">all</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Germany">Germany</option>
                <option value="Belgium">Belgium</option>
              </select>
            </div>
            <div>
              <label className="label">rooms: </label>
              <select name="size_rooms" value={size_rooms} onChange={this.HandleValueChange}>
                <option value="">all</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4 or more </option>
              </select>
            </div>
            <div>
              <label className="label">price min: </label>
              <select name="price_min" value={price_min} onChange={this.HandleValueChange}>
                <option value="0">0</option>
                <option value="10000">10000</option>
                <option value="20000">20000</option>
                <option value="30000">30000</option>
                <option value="40000">40000</option>
                <option value="50000">50000</option>
                <option value="60000">60000</option>
                <option value="70000">70000</option>
                <option value="80000">80000</option>
                <option value="90000">90000</option>
                <option value="100000">100000</option>
              </select>
            </div>
            <div>
              <label className="label">price max: </label>
              <select name="price_max" value={price_max} onChange={this.HandleValueChange}>
                <option value="0">0</option>
                <option value="10000">10000</option>
                <option value="20000">20000</option>
                <option value="30000">30000</option>
                <option value="40000">40000</option>
                <option value="50000">50000</option>
                <option value="60000">60000</option>
                <option value="70000">70000</option>
                <option value="80000">80000</option>
                <option value="90000">90000</option>
                <option value="100000">100000</option>
              </select>
            </div>
            <div>
              <label className="label">sort: </label>
              <select name="sort" value={sort} onChange={this.HandleValueChange}>
                <option value="location_country_asc">country ASC</option>
                <option value="location_country_desc">country DESC</option>
                <option value="price_value_asc">price ASC</option>
                <option value="price_value_desc">price DESC</option>
              </select>
            </div>
            <button className="button" type="submit" name="submit_filtering" value="search">
              search
            </button>
          </form>
        </div>
        <div className="houses-list">
          {currentPosts.map(house => (
            <Link key={house.id} to={`/houses/${house.id}`}>
              <div className="house-card">
                <div className="card-img">
                  <img className="card-img" src={house.images} alt="house" />
                </div>
                <ul>
                  <li>
                    <strong> Rooms : </strong>
                    {house.size_rooms}
                  </li>
                  <li>
                    <strong> Country :</strong> {house.location_country}
                  </li>
                  <li>
                    <strong> City : </strong>
                    {house.location_city}
                  </li>
                  <li>
                    <strong> price : </strong>
                    {house.price_value + house.price_currency}
                  </li>
                </ul>
              </div>
            </Link>
          ))}
        </div>
        <div className="pagination-bar">
          <Pagination
            prevPageText="prev"
            nextPageText="next"
            firstPageText="first page"
            lastPageText="last page"
            activePage={activePage}
            itemsCountPerPage={currentPosts.length}
            totalItemsCount={houses.length}
            pageRangeDisplayed={Math.ceil(houses.length / 5)}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default HouseList;
