import React from 'react';

const Report = props => {
  const { errors, report, errLoaded, isLoaded } = props.data;
  return (
    <div className="report">
      {errLoaded ? (
        <div>Error: {errors}</div>
      ) : isLoaded ? (
        <div>
          <div>report:</div>
          <div>{report.responseMessage}</div>

          <pre>>valid houses: {JSON.stringify(report.validHouses[0].rawData, null, 2)}</pre>

          <div className="report">
            invalid houses :{report.invalidHouses ? report.invalidHouses.length : 0}
            <div className="report">
              invalid house:
              <pre>{JSON.stringify(report.invalidHouses.rawData, null, 2)}</pre>
              errors:
              <pre>{JSON.stringify(report.invalidHouses.errors, null, 2)}</pre>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Report;
