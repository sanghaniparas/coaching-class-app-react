import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CoachingDetailsAllExam from './CoachingDetailsAllExam';
import PracticeSetsAllCard from './PracticeSetsAllCard';
import axios from 'axios';
import { BASE_URL } from './../../../config';
import Loader from 'react-loader-spinner';

const CoachingDetailsPracticeSets = ({ practisePage, pageDetails, cardItemNumber, incrementItemNumber, match }) => {
  const [filterState, setFilterState] = useState([]);
  const [tab, setTab] = useState('All');
  const [isActive, setIsActive] = useState(0);
  const [order, setOrder] = useState('trending');

  const [loading, setLoading] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

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
      setLoading(true);
      
      const payload = {
        coachingId: match.params.id,
        page: 'practiceSet',
        order: e.target.value,
        subjectId: '',
      };
      const response = await axios.post(
        `${BASE_URL}/coaching/sections/`,
        payload
      );
      setFilteredData(response.data.data);
      setLoading(false);
      
    } catch (err) {
      console.log(err);
      setLoading(false);
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
      let data = practisePage.filter((el) => el.examType.examType === tab);
      return setFilterState(data);
    } else {
      let data = filteredData.filter((el) => el.examType.examType === tab);
      return setFilterState(data);
    }
    // let data = practisePage.filter((el) => el.examType.examType === tab);
    // setFilterState(data);
  };

  useEffect(() => {
    filterData(tab);
    setOrder('relevance');
  }, [tab]);

  useEffect(() => {
    
    if(practisePage.length) {
      setLoading(true)
      let firstTab = practisePage[0].examType.examType;
      setTab(firstTab);
      setTimeout(() => setLoading(false), 1000)
      // setLoading(false)
    }
  }, [practisePage])
  useEffect(() => {
    setFilterState([]);
  }, []);

  return (
    loading ?   <div style={{ minHeight: '100vh' }}>
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
      {practisePage.length > 0 ? (
        <>
          <div className="a-wrapper">
            <div className="a-select-choices">
              <div className="a-container">
                <div className="a-content">
                  <ul>
                    {practisePage.length >= 5
                      ? ''
                      : practisePage.map((el, idx) => (
                          <React.Fragment key={idx}>
                            <li
                              // className={isActive === idx ? 'active' : ''}
                              className={tab === el.examType.examType ? 'active' : ''}
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
              <PracticeSetsAllCard
                pageDetails={pageDetails}
                practisePage={practisePage.filter(
                  // (el) => el.examTypeId === 10000000
                  (el) => el.examType.examType === tab
                )}
                cardItemNumber={cardItemNumber}
                incrementItemNumber={incrementItemNumber}
              />
            ) : (
              <PracticeSetsAllCard
                pageDetails={pageDetails}
                practisePage={filteredData}
                cardItemNumber={cardItemNumber}
                incrementItemNumber={incrementItemNumber}
              />
            )
          ) : (
            <PracticeSetsAllCard
              pageDetails={pageDetails}
              practisePage={filterState}
              cardItemNumber={cardItemNumber}
              incrementItemNumber={incrementItemNumber}
            />
          )}

          {/* <PracticeSetsAllCard
            practisePage={filterState.length === 0 ? practisePage : filterState}
          /> */}
        </>
      ) : (
        !loading && <div className="a-nodata-Content">No Practice Set Available</div>
      )}
    </>
  );
};

export default withRouter(CoachingDetailsPracticeSets);
