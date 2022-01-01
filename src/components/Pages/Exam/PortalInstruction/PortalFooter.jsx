import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { LineArrow } from '../../../Core/Layout/Icon';

const PortalFooter = ({ id }) => {
  const history = useHistory();

  return (
    <div className="temp-footer-wrapper">
      <span className="back-btn" onClick={() => history.goBack()}>
        {' '}
        <LineArrow fill="#e76c49" /> Go Back to Test Series
      </span>
      <button
        className="btn-primary radius"
        onClick={() =>
          // history.push(`/testinstruction/${id}`)
          history.push({
            pathname: `/test-instructions`,
            state: { id: id }
          })
        }>
        {/* onClick={() => history.push(`/testinstruction/${match.params.id}`)}> */}
        Next
      </button>
    </div>
  );
};

export default withRouter(PortalFooter);
