import React, { Fragment } from 'react';

const Direction = ({ description }) => {
  return (
    <Fragment>
      <div className="view-container-left">
        <p>{description} </p>
      </div>
    </Fragment>
  );
};

export default Direction;
