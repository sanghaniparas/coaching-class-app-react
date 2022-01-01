import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPassActivities } from './../../../../redux/Dashboard/dashboard.selectors';

const RecentActivities = ({ pass_activities }) => {
  console.log(`pass_activities`, pass_activities)
  const [category, setCategory] = useState(1);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(3);

  //   For setting data of test, practices, quizzes
  useEffect(() => {
    setCounter(3);
    if (pass_activities !== null) {
      if (category === 1) setData(pass_activities);
      if (category === 2) filterDate(category);
      if (category === 3) filterDate(category);
      if (category === 4) filterDate(category);
    }
  }, [pass_activities, category]);

  const filterDate = (num) => {
    if (num === 2) {
      let arr = pass_activities.filter((el) =>
        moment(el.attemptedOn).isSame(new Date(), 'day')
      );
      setData(arr);
    }
    if (num === 3) {
      let arr = pass_activities.filter((el) =>
        moment(el.attemptedOn).isSame(new Date(), 'week')
      );
      setData(arr);
    }
    if (num === 4) {
      let arr = pass_activities.filter((el) =>
        moment(el.attemptedOn).isSame(new Date(), 'month')
      );
      setData(arr);
    }
  };

  return (
    <div className="column-half activity-pass-tab">
      <div className="a-test-series">
        <div className="a-tes-doc activity">
          <h3 className="">Pass Activities</h3>
          <ul className="tablist">
            <li
              className={category === 1 && 'active'}
              onClick={() => setCategory(1)}>
              All
            </li>
            <li
              className={category === 2 && 'active'}
              onClick={() => setCategory(2)}>
              Today
            </li>
            <li
              className={category === 3 && 'active'}
              onClick={() => setCategory(3)}>
              This Week
            </li>
            <li
              className={category === 4 && 'active'}
              onClick={() => setCategory(4)}>
              This Month
            </li>
          </ul>
          <div className="tab_activity">          
            {data && data.length > 0 ? data.slice(0, counter).map((x) => (
              <div className="test-activity-card">
                <span className="icon gradient-bg">
                  <img
                    src={require('../../../../assets/images/pass-activities.svg')}
                    className=""
                    alt=""
                  />
                </span>
                <div className="test-activity-content">
                  <div className="left">
                    <h5>
                      {x.testName} <span>({x.testExamType})</span>
                    </h5>
                    {x.isCompleted === 0 ? (
                      <p>
                        Last attempted on {moment(x.attemptedOn).format('lll')}
                      </p>
                    ) : (
                      <p>
                        Score: {x.score}/{x.testMarks}
                      </p>
                    )}
                  </div>
                  <div className="action">
                    {x.isCompleted === 0 ? (
                      <span className="text-warning">RESUME</span>
                    ) : (
                      <>
                        <span className="text-blue">ANALYZE</span>
                        <span className="text-warning">REAPPEAR</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )) : <div className="a-nodata-Content">No data found</div>}
          </div>
          {data && data.length > 0 && <span
            className="view"
            onClick={() => setCounter((counter) => counter + 3)}>
            View More{' '}
            <img
              src={require('../../../../assets/images/view-more.svg')}
              alt=""
            />
          </span>
          }


        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  pass_activities: selectPassActivities,
});

export default connect(mapStateToProps)(RecentActivities);
