import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CoachingDetailsAllExam from './CoachingDetailsAllExam';
import TestSeriesAllCard from './TestSeriesAllCard';
import axios from 'axios';
import { BASE_URL } from './../../../config';
import Loader from 'react-loader-spinner';

const CoachingDetailsTestSeries = ({ testSeriesPage, pageDetails, cardItemNumber, incrementItemNumber, match }) => {
  const [filterState, setFilterState] = useState([]);
  const [tab, setTab] = useState('All');
  const [isActive, setIsActive] = useState(0);
  const [order, setOrder] = useState('trending');

  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(false);

  const changeTab = (e, idx) => {
    e.preventDefault();
    setIsActive(idx);
    setTab(e.target.textContent);
    setFilterState([]);
    setFilteredData([]);
  };

  const onChangeOrder = async (e) => {
    setOrder(e.target.value);
    try {
      setLoading(true)
      const payload = {
        coachingId: match.params.id,
        page: 'testSeries',
        order: e.target.value,
        subjectId: '',
      };
      const response = await axios.post(
        `${BASE_URL}/coaching/sections/`,
        payload
      );

      console.log(response.data.data);
      setFilteredData(response.data.data);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };
  useEffect(() => {
    filterData(tab);
  },[filteredData])
  const filterData = (tab) => {
    // if (tab === 'All') {
    //   setFilterState([]);
    //   return setFilteredData([]);
    // }

    if (filteredData.length === 0) {
      if(testSeriesPage){
        let data = testSeriesPage.filter((el) => el.examType.examType === tab);
        return setFilterState(data);
      }
     
    } else {
      let data = filteredData.filter((el) => el.examType.examType === tab);
      return setFilterState(data);
    }
    // let data = testSeriesPage.filter((el) => el.examType.examType === tab);
    // setFilterState(data);
  };

  useEffect(() => {
    filterData(tab);
    setOrder('relevance');
  }, [tab]);

  useEffect(() => {
    if(testSeriesPage && testSeriesPage.length) {
      setLoading(true)
      let firstTab = testSeriesPage[0].examType.examType;
      setTab(firstTab);
      setTimeout(() => setLoading(false), 1000)
    }
  }, [testSeriesPage])

  useEffect(() => {
    setFilterState([]);
    // window.scrollTo(499, 499);
  }, []);

  return (
    
    loading ?
    <div style={{ minHeight: '100vh' }}>
    <Loader
      style={{
        position: 'absolute',
        top: '90%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      type="Oval"
      color="#FF7249"
      height={40}
      width={40}
    
    />
  </div> :
   <>
      {testSeriesPage && testSeriesPage.length > 0 ? (
        <>
          <div className="a-wrapper">
            <div className="a-select-choices">
              <div className="a-container">
                <div className="a-content">
                  <ul>
                    {testSeriesPage.length >= 5
                      ? ''
                      : testSeriesPage.map((el, idx) => (
                          <React.Fragment key={idx}>
                            <li
                              // className={isActive === idx ? 'active' : ''}
                              className={el.examType.examType === tab ? 'active' : ''}
                              onClick={(e) => changeTab(e, idx)}>
                              {el.examType.examType}
                            </li>
                          </React.Fragment>
                        ))}
                  </ul>
                  <div className="filter-group">
                    <p>Sort By </p>
                    <select
                      name=""
                      value={order}
                      onChange={(e) => onChangeOrder(e)}>
                      <option value="relevance">Relevance</option>
                      <option value="trending">Trending</option>
                      <option value="highestRated">Highest Rated</option>
                      <option value="mostAttempted">Most Attempted</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {filterState.length === 0 ? (
            filterState.length === 0 && filteredData.length === 0 ? (
              <TestSeriesAllCard
                pageDetails={pageDetails}
                testSeriesPage={testSeriesPage.filter(
                  // (el) => el.examTypeId === 10000000
                  (el) => el.examType.examType === tab
                )}
                cardItemNumber={cardItemNumber}
                incrementItemNumber={incrementItemNumber}
              />
            ) : (
              <TestSeriesAllCard
                pageDetails={pageDetails}
                testSeriesPage={filteredData}
                cardItemNumber={cardItemNumber}
                incrementItemNumber={incrementItemNumber}
              />
            )
          ) : (
            <TestSeriesAllCard
              pageDetails={pageDetails}
              testSeriesPage={filterState}
              cardItemNumber={cardItemNumber}
              incrementItemNumber={incrementItemNumber}
            />
          )}

          {/* <TestSeriesAllCard
            testSeriesPage={
              filterState.length === 0 ? testSeriesPage : filterState
            }
          /> */}
        </>
      ) : (
        <div className="a-nodata-Content">No Test Series Available</div>
      )}
      </>
  );
};

export default withRouter(CoachingDetailsTestSeries);
