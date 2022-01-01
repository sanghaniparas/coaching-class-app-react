import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { QUESTIONLABEL } from './Constant';



const QusetionDifficultyGraph = ({ questionDifficulty }) => {
  let labelItems = [];
  let hardItems = [];
  let mediumItems = [];
  let easyItems = [];
  let highest = 0;
  questionDifficulty.map((object, i) => {
    labelItems.push(object.subject);
    object.items.map((item, i) => {
      item.difficulty === QUESTIONLABEL.HARD && hardItems.push(item.totalQuestion);
      item.difficulty === QUESTIONLABEL.EASY && easyItems.push(item.totalQuestion);
      item.difficulty === QUESTIONLABEL.MIDIUM && mediumItems.push(item.totalQuestion);
      highest = highest < item.totalQuestion && item.totalQuestion || highest;
    });
  });
  const data = {
    labels: labelItems,
    datasets: [
      {
        label: QUESTIONLABEL.HARD,
        backgroundColor: "#ff3e54",
        data: hardItems
      },
      {
        label: QUESTIONLABEL.MIDIUM,
        backgroundColor: "#fc8f2d",
        data: mediumItems
      },
      {
        label: QUESTIONLABEL.EASY,
        backgroundColor: "#25cd71",
        data: easyItems
      }
    ],
  };
  return (
    <Fragment>
      <div className="card difficulty">
        <h2 className="report-title">Question Difficulty</h2>
        <Bar
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true,
            scales: {
              xAxes: [{
                barPercentage: 1,
                barThickness: 15
              }],
              yAxes: [{
                ticks: {
                  min: 0,
                  max: (highest + 2),
                  stepSize: 1
                }
              }]
            }
          }}
        />
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

export default connect(null)(QusetionDifficultyGraph);
