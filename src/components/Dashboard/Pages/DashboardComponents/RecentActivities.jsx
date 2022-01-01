import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRecentActivities } from '../../../../redux/Dashboard/dashboard.selectors';
import { useHistory } from 'react-router-dom';


const RecentActivities = ({ recent_activities }) => {
  console.log(`recent_activities`, recent_activities)
  const [category, setCategory] = useState(1);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(3);
  const history = useHistory()

  //   For setting data of test, practices, quizzes
  useEffect(() => {
    setCounter(3);
    if (recent_activities !== null) {
      if (category === 1) sumAllData(recent_activities);
      if (category === 2) setData(recent_activities.test_result_data);
      if (category === 3) setData(recent_activities.practiceset_result_data);
      if (category === 4) setData(recent_activities.quiz_result_data.filter((x) => x.isCompleted !== 0));
    }
  }, [recent_activities, category]);

  const sumAllData = (obj) => {
    let arr = [
      ...obj.test_result_data,
      ...obj.practiceset_result_data,
      ...obj.quiz_result_data.filter((x) => x.isCompleted !== 0)
    ]
    let finaldata=arr.sort((a,b) => {
      return new Date(a.attemptedOn).getTime() - 
          new Date(b.attemptedOn).getTime()
  }).reverse();
  console.log(`final`, finaldata)


    setData(finaldata);
  };

  const handleQuizReapear = (id) => {
    history.push(`/quizdetails/${id}`)

  }
  const handleQuizReport = (id, reportId) => {
    history.push(`/quizreport/${id}/${reportId}`)

  }

  const handlePracticeResume = (id1, id2) => {
    history.push(`/practiceportal/${id2}/${id1}`)

  }

  const handlePracticeReapear = (id1) => {
    history.push(`/practice-details/${id1}`)

  }

  return (
    <div className="column-half activity-pass-tab">
      <div className="a-test-series">
        <div className="a-tes-doc activity">
          <h3 className="">Recent Activities</h3>
          <ul className="tablist">
            <li
              className={category === 1 && 'active'}
              onClick={() => setCategory(1)}>
              All
            </li>
            <li
              className={category === 2 && 'active'}
              onClick={() => setCategory(2)}>
              Test Series
            </li>
            <li
              className={category === 3 && 'active'}
              onClick={() => setCategory(3)}>
              Practice
            </li>
            <li
              className={category === 4 && 'active'}
              onClick={() => setCategory(4)}>
              Quiz
            </li>
          </ul>
          <div className="tab_activity">
          {data && data.length > 0 ? data.slice(0, counter).map((x) => (
            <div className="test-activity-card">
              <span
                className={`icon ${x.testName && 'light-blue-bg'} ${x.practiceSetName && 'red-bg'
                  } ${x.quizName && 'dark-blue-bg'}`}>
                {x.testName && (
                  <img
                    src={require('../../../../assets/images/full-test.svg')}
                    className=""
                    alt=""
                  />
                )}
                {x.practiceSetName && (
                  <img
                    src={require('../../../../assets/images/aptitude-ssc.svg')}
                    className=""
                    alt=""
                  />
                )}
                {x.quizName && (
                  <img
                    src={require('../../../../assets/images/sbi-banking.svg')}
                    className=""
                    alt=""
                  />
                )}
              </span>
              <div className="test-activity-content">
                <div className="left">
                  <h5>
                    {x.testName && x.testName}{' '}
                    {x.practiceSetName && x.packagesetChapter}{' '}
                    {x.quizName && x.quizName}{' '}
                    {x.testName && (
                      <span>({x.testName && x.testPackageName})</span>
                    )}
                    {x.practiceSetName && (
                      <span>({x.practiceSetName && x.practiceSetName})</span>
                    )}
                  </h5>
                  {x.testName && (
                    <p>
                      {x.isCompleted === 0
                        ? `Last attempted on ${moment(x.attemptedOn).format(
                          'lll'
                        )}`
                        : `Score: ${x.testName && x.score}/${x.testName && x.testMarks
                        }`}
                    </p>
                  )}
                  {x.practiceSetName && (
                    <p>
                      Last attempted on {moment(x.attemptedOn).format('lll')}
                    </p>
                  )}
                  {x.quizName && (
                    <p>Attempted on {moment(x.attemptedOn).format('lll')}</p>
                  )}
                </div>
                {x.testName && (
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
                )}
                {x.practiceSetName && (
                  <div className="action">
                    {x.isCompleted === 0 || x.isCompleted === 2 ? (
                      <span className="text-warning" onClick={() => handlePracticeResume(x.subjectId, x.practiceSetId)}>RESUME</span>
                    ) : (
                        <span className="text-warning" onClick={() => handlePracticeReapear(x.practiceSetId)} >REAPPEAR</span>
                      )}
                  </div>
                )}
                {x.quizName && (
                  <div className="action">
                    {x.isCompleted === 0 ? (
                      <span className="text-warning">RESUME</span>
                    ) : (
                        <>
                          <span className="text-blue" onClick={() => handleQuizReport(x.quizId, x.id)}>VIEW SOLUTIONS</span>
                          {/* <span className="text-warning" onClick={() => handleQuizReapear(x.quizId)}>REAPPEAR</span> */}
                        </>
                      )}
                  </div>
                )}
              </div>
            </div>
          )) : <div className="a-nodata-Content">No data found</div>}
          </div>
          {counter < data.length ?
            <span
              className="view"
              onClick={() => setCounter((counter) => counter + 3)}>
              View More{' '}
              <img
                src={require('../../../../assets/images/view-more.svg')}
                alt=""
              />
            </span> : ""}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  recent_activities: selectRecentActivities,
});

export default connect(mapStateToProps)(RecentActivities);
