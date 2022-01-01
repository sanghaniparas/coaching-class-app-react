import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BASE_IMAGE_UPLOAD } from '../../../../config';
import { ToolTip } from './../../../Core/Layout/Tooltip/ToolTip';


const TopPerformer = ({ topPerformer }) => {
  return (
    <Fragment>
      <div className="perform-right">
        <div className="performar card">
          <h2 className="report-title">
            Top Performer{' '}
            {
              <ToolTip
                message={'Based on user first attempt .'}
                position={'right'}>
                <img
                  src={require('../../../../assets/images/info.svg')}
                  alt=""
                />
              </ToolTip>
            }
          </h2>

          <ul>
            <li>
              <span className="name">Name</span>
              <span className="marks">Marks</span>
            </li>
            {topPerformer.map((item, i) => (
              <li key={i}>
                <div className="avatar-info">
                  <span className="number">{item.rank}.</span>
                  {item?.student?.studentAvatar !== null ?
                  <img
                    src={BASE_IMAGE_UPLOAD + '/storage/student_avatar/' + item?.student?.studentAvatar}
                    alt=""
                  /> : <img
                  src={require('../../../../assets/images/no-image-icon-md.png')}
                  alt=""
                  /> }
                  <p className="avt-name">
                    {item.student && item.student.name}
                  </p>
                </div>
                <span className="avt-marks">
                  {item.score}/{item.totalMarks}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     // testInstructions: state.exam.testInstructions,
//     // sectionNumber: state.exam.sectionNumber,
//   };
// };

export default connect(null)(TopPerformer);
