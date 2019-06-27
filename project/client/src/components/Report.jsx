import React from 'react';

const Report = props => {
  const { errors, report, errLoaded } = props.data;
  return (
    <div className="report">
      {errLoaded ? <div>Error: {errors}</div> : null}
      <div>report:</div>
      <div>{report.responseMessage}</div>
      {report.validHouses.length ? (
        <pre>>valid houses: {JSON.stringify(report.validHouses[0].rawData, null, 2)}</pre>
      ) : null}
      <div className="report">
        invalid houses :{report.invalidHouses.length}
        {report.invalidHouses.length ? (
          <div className="report">
            invalid house:
            <pre>{JSON.stringify(report.invalidHouses[0].rawData, null, 2)}</pre>
            errors:
            <pre>{JSON.stringify(report.invalidHouses[0].errors, null, 2)}</pre>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Report;
