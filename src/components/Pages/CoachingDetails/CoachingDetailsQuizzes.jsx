import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CoachingDetailsAllExam from './CoachingDetailsAllExam';
import QuizzesAllCard from './QuizzesAllCard';
import axios from 'axios';
import { BASE_URL } from './../../../config';
import Loader from 'react-loader-spinner';

const CoachingDetailsQuizzes = ({ quizzesPage, pageDetails, cardItemNumber, incrementItemNumber, match }) => {
  const [filterState, setFilterState] = useState([]);
  const [tab, setTab] = useState('All');
  const [subjects, setSubjects] = useState([]);
  const [isActive, setIsActive] = useState(0);
  const [subjectId, setSubjectId] = useState('');
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

  const onSubjectChange = async (e) => {
    setSubjectId(e.target.value);

    try {
      const payload = {
        coachingId: match.params.id,
        page: 'quizzes',
        order: order,
        subjectId: e.target.value,
      };
      const response = await axios.post(
        `${BASE_URL}/coaching/sections/`,
        payload
      );

      console.log(response.data.data);
      setFilteredData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeOrder = async (e) => {
    setOrder(e.target.value);
    try {
      setLoading(true)
      const payload = {
        coachingId: match.params.id,
        page: 'quizzes',
        order: e.target.value,
        subjectId: subjectId,
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
    // console.log(quizzesPage);
    // if (tab === 'All') {
    //   setFilterState([]);
    //   return setFilteredData([]);
    // }

    if (quizzesPage && filteredData.length === 0) {
      let data = quizzesPage.filter((el) => el.examType.examType === tab);
      return setFilterState(data);
    } else {
      let data = filteredData.filter((el) => el.examType.examType === tab);
      return setFilterState(data);
    }
  };

  useEffect(() => {
    filterData(tab);
    setSubjectId('');
    setOrder('relevance');
  }, [tab]);
  useEffect(() => {
    if(quizzesPage && quizzesPage.length) {
      setLoading(true)
      let firstTab = quizzesPage[0].examType.examType;
      setTab(firstTab);
      setTimeout(() => setLoading(false), 1000)
    }
  }, [quizzesPage])

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await axios.get(
          `${BASE_URL}/coaching/quizzFilterSubjects/${pageDetails.id}`
        );

        setSubjects(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchSubjects();
    setFilterState([]);
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
      {quizzesPage && quizzesPage.length > 0 ? (
        <>
          <div className="a-wrapper">
            <div className="a-select-choices">
              <div className="a-container">
                <div className="a-content">
                  <ul>
                    {quizzesPage.length >= 5
                      ? ''
                      : quizzesPage.map((el, idx) => (
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
                  <div>
                    <div className="filter-group">
                      <div className="group">
                        <p>Filter By </p>
                        <select
                          name=""
                          value={subjectId}
                          onChange={(e) => onSubjectChange(e)}>
                          <option value="">All</option>
                          {subjects.map((el, i) => (
                            <option value={el.id}>{el.subject}</option>
                          ))}
                        </select>
                      </div>
                      <div className="group">
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
            </div>
          </div>

          {filterState.length === 0 ? (
            filterState.length === 0 && filteredData.length === 0 ? (
              <QuizzesAllCard
                pageDetails={pageDetails}
                quizzesPage={quizzesPage.filter(
                  // (el) => el.examTypeId === 10000000
                  (el) => el.examType.examType === tab
                )}
                cardItemNumber={cardItemNumber}
                incrementItemNumber={incrementItemNumber}
              />
            ) : (
                <QuizzesAllCard
                  pageDetails={pageDetails}
                  quizzesPage={filteredData}
                  cardItemNumber={cardItemNumber}
                  incrementItemNumber={incrementItemNumber}
                />
              )
          ) : (
              <QuizzesAllCard
                pageDetails={pageDetails}
                quizzesPage={filterState}
                cardItemNumber={cardItemNumber}
                incrementItemNumber={incrementItemNumber}
              />
            )}
          {/* {filterState.length ? (
            <QuizzesAllCard quizzesPage={filterState} />
          ) : null} */}
        </>
      ) : (
          <div className="a-nodata-Content">No Quizzes Available</div>
        )}
    </>
  );
};

// filterState

export default withRouter(CoachingDetailsQuizzes);
