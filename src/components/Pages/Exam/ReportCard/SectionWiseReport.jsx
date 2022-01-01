import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const SectionWiseReport = ({ sectionWiseReport }) => {
  const { overall, sections } = sectionWiseReport;
  return (
    <Fragment>
      <div className="section-report card">
        <h2 className="report-title">Section Wise Report</h2>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Section Name</th>
                <th>Score</th>
                <th>Attempted</th>
                <th>Accuracy</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section, i) => (
                <Fragment key={i}>
                  <tr>
                    <td>{section.section}</td>
                    <td>{section.score && Number(section.score).toFixed(2) || 0} <span>/{section.totalMarks}</span> </td>
                    <td>{section.totalAttempted}<span>/{section.totalQuestion}</span></td>
                    <td>{section.accuracy} <span>%</span></td>
                    <td>{moment.utc(section.totalSpendTime * 1000).format('mm:ss')} <span>{section.sectionTotalTime && `/${section.sectionTotalTime}min`} </span></td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Overall</th>
                <th>{overall.score && Number(overall.score).toFixed(2) || 0} <span>/{overall.totalMarks}</span> </th>
                <th>{overall.totalAttempted} <span>/{overall.totalQuestion}</span></th>
                <th>{overall.accuracy} <span>%</span></th>
                <th>{moment.utc(overall.totalSpendTime * 1000).format('mm:ss')} <span>/{overall.totalTime} min</span></th>
              </tr>
            </tfoot>
          </table>
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

export default connect(null)(SectionWiseReport);
