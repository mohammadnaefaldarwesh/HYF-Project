import React from 'react';
import Report from './Report';

class Contribute extends React.Component {
  state = {
    errors: [],
    report: [],
    isLoaded: false,
    errLoaded: false,
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

  render() {
    const { isLoaded } = this.state;
    return (
      <div>
        <form className="contribution-form">
          <textarea
            className="contribution-textarea"
            placeholder="  insert houses info:"
            ref={el => {
              this.HouseInput = el;
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
