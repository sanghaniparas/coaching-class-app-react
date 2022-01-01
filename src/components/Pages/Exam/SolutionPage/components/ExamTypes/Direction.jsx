import React, { Fragment } from 'react';

const Direction = ({ description }) => {
  return (
    <Fragment>
      <div className="view-container-left">
        {/* <h3 className="subject-title">{description}</h3> */}
        <p>{description}</p>
      </div>
    </Fragment>
  );
};

export default Direction;
