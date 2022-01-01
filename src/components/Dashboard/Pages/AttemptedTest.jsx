import React, { useState, useEffect } from 'react';
import { Layout } from '../Layout/Layout';
import { ArrowDown, AlarmClock, CalenderIcon } from '../../Core/Layout/Icon';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import moment from 'moment';
import { BASE_URL } from './../../../config';
import axios from 'axios';
import { getAttemptedTest, getPackageName } from '../../../redux/Dashboard/dashboard.actions';
import { useDispatch, connect } from 'react-redux';
import { selectAttemptedTest } from '../../../redux/Dashboard/dashboard.selectors';
import { createStructuredSelector } from 'reselect';
import TestSeriesItem from './TestSeriesComponents/TestSeriesItem';

const AttemptedTest = ({ attemptedTest }) => {
  const counter = 5;
  const dispatch = useDispatch();

  const [coachingList, setCoachingList] = useState(null);
  const [coachingId, setCoachingId] = useState(null);
  const [testPackageId, setTestPackageId] = useState(null);
  const [testid, setTestId] = useState(-1);

  const [testItems, setTestItems] = useState(null);
  const [filteredDateItems, setFilteredDateItems] = useState(null);
  const [allData, setAllData] = useState(null);
  const [allDataCount, setAllDataCount] = useState(0);

  const [searchText, setSearchText] = useState('');
  const [showText, setShowText] = useState('');

  const [dateDuration, setDateDuration] = useState({
    startDate: '',
    endDate: '',
  });

  const [dropdown, setdropdown] = useState(false);
  const dropdownToggleHandler = () => {
    setShowText('');
    setdropdown(!dropdown);
  };
  const closeDropdownHandler = () => {
    setdropdown(!dropdown);
  }

  useEffect(() => {
    async function getCoachings() {
      try {
        const config = {
          headers: {
            'Content-Type': 'Application/json',
            Authorization: `${localStorage.token}`,
          },
        };
        const {
          data: { data },
        } = await axios.get(
          `${BASE_URL}/dashboard/dashboard/attempted_test_coaching_list`,
          config
        );

        setCoachingList(data);
      } catch (error) {
        console.log(error);
      }
    }
    getCoachings();
  }, []);
  //  For setting coachingId
  useEffect(() => {
    if (coachingList !== null && coachingList.length !== 0) {
      setCoachingId(coachingList[0].id);
    }
  }, [coachingList]);

  //   For setting packageId
  useEffect(() => {
    setTestId(-1);
    if (coachingList && coachingId) {
      setTestPackageId(
        coachingList.find((el) => el.id === coachingId).testPackage[0].id
      );
    }
  }, [coachingId, coachingList]);

  //   Foir dispatching action to get attempted test
  useEffect(() => {
    if (coachingId && testPackageId) {
      dispatch(
        getAttemptedTest({
          testPackageId: testPackageId.toString(),
          coachingId: coachingId.toString(),
        })
      );
    }
  }, [coachingId, testPackageId]);

  useEffect(() => {
    if (attemptedTest) {
      if (testid === -1) {
        setTestItems(attemptedTest.allTests);
      } else {
        let arr = attemptedTest.allTests.filter(
          (el) => el.packageTestType.id === testid
        );
        setTestItems(arr);
      }
    }
  }, [testid, attemptedTest]);

  //   For filtering dates
  const filterByDate = (num) => {
    setDateDuration({
      startDate: '',
      endDate: '',
    });
    if (num === 1) {
      let arr = testItems.filter((item) => {
        let format = moment(item.attemptedOn).format('L');
        return moment().isSame(format, 'day');
      });
      setFilteredDateItems(arr);
    }
    if (num === 2) {
      let arr = testItems.filter((item) => {
        let format = moment(item.attemptedOn).format('L');
        return moment().isSame(format, 'week');
      });
      setFilteredDateItems(arr);
    }
    if (num === 3) {
      let arr = testItems.filter((item) => {
        let format = moment(item.attemptedOn).format('L');
        return moment().isSame(format, 'month');
      });
      setFilteredDateItems(arr);
    }
    if (num === 4) {
      let arr = testItems.filter((item) => {
        let format = moment(item.attemptedOn).format('L');
        return moment().isSame(format, 'year');
      });
      setFilteredDateItems(arr);
    }
    if (num === 5) {
      let prevYear = moment().subtract(1, 'year');
      let year = moment(prevYear).format('YYYY');
      let arr = testItems.filter((item) => {
        return moment(item.attemptedOn).format('YYYY') === year;
      });
      setFilteredDateItems(arr);
    }
    if (num === 6) {
      setFilteredDateItems(testItems);
    }

    dropdownToggleHandler();
  };

  //   For applying date range
  const submitDate = () => {
    console.log('dateDuration ==> ', dateDuration);
    let dataArray = [];
    if(dateDuration.startDate!=='') {
      dataArray.push(dateDuration.startDate);
    } if(dateDuration.endDate!=='') {
      dataArray.push(dateDuration.endDate);
    }
    let dataString = dataArray.join(' - ');
    let arr = testItems.filter((item) => {
      return moment(item.attemptedOn).isBetween(
        dateDuration.startDate,
        dateDuration.endDate
      );
    });
    setShowText(dataString);
    setFilteredDateItems(arr);
    // dropdownToggleHandler();
    closeDropdownHandler();
  };

  //   For resetting value in date modal
  useEffect(() => {
    if (testItems !== null) {
      setFilteredDateItems(testItems);
      setDateDuration({
        startDate: '',
        endDate: '',
      });
    }
  }, [testItems]);

  useEffect(() => {
    if(filteredDateItems!==null) {
      let allDataVariable = filteredData(filteredDateItems);
      let sliceData = allDataVariable.slice(0, counter);
      setAllData(sliceData);
      setAllDataCount(sliceData.length);
    } else {
      setAllData(null);
      setAllDataCount(0);
    }
  },[filteredDateItems]);

  const viewMore = (e) => {
    e.preventDefault();
    let incrementCounter = allDataCount+2;
    let viewDataVariable = filteredData(filteredDateItems);
    setAllData(viewDataVariable.slice(0, incrementCounter));
    setAllDataCount(viewDataVariable.length);
  }
  useEffect(() => {
    let searchResult = null;
    if(testItems !== null) {
      if(testItems.length) {
        searchResult = filteredData(testItems);
      }
    }
    setFilteredDateItems(searchResult);
  },[searchText]);
  const filteredData = (dataList) => {
    let dataResult = dataList.filter((element) => {
      if(searchText === '') return true
      return element.testName
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    return dataResult;
  }
  return (
    <Layout>
      <div className="a-test-series">
        <div className="a-tes-doc a-bg-gray">
          <div className="a-test-type-packages">
            <div className="a-test-inputbox">
              <p>Search</p>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search Test by package, coaching etc."
              />
            </div>
            <div className="a-test-selectBox">
              <p>Select Coaching</p>
              <select
                value={coachingId && coachingId}
                onChange={(e) => setCoachingId(Number(e.target.value))}>
                {coachingList &&
                  coachingList.map((coaching) => (
                    <option value={coaching.id}>{coaching.coachingName}</option>
                  ))}
              </select>
            </div>
            <div className="a-test-selectBox">
              <p>Test Packages</p>
              <select
                value={testPackageId && testPackageId}
                onChange={(e) => {
                  let optionText = coachingList.find((el) => el.id === coachingId).testPackage.find(el => el.id === parseInt(e.target.value)).packageName;
                  dispatch(getPackageName(optionText));
                  setTestPackageId(Number(e.target.value))
                }}>
                {coachingList &&
                  coachingId &&
                  coachingList
                    .find((el) => el.id === coachingId)
                    .testPackage.map((el) => (
                      <option value={el.id}>{el.packageName}</option>
                    ))}
              </select>
            </div>
          </div>
        </div>
        <div className="a-tes-doc a-test-listseries a-test_attempted">
          <div
            className="a-test-bottom"
            style={{ marginTop: '-35px', marginBottom: '10px', float: 'none' }}>
            <ul className="a-test-subtab-exam">
              <li
                className={testid === -1 && 'subtab-selected'}
                onClick={() => setTestId(-1)}>
                All
              </li>
              {attemptedTest &&
                attemptedTest.examNameExamTypeGroup.map((el) =>
                  el.packageTestTypes.map((x) => (
                    <li
                      className={
                        testid === x.packageTestTypeId && 'subtab-selected'
                      }
                      onClick={() => setTestId(x.packageTestTypeId)}>
                      {x.packageTestTypeName}
                    </li>
                  ))
                )}
            </ul>

            <div className="question-filter attempted-filter">
              <div className="filter" style={{ marginBottom: '-30px' }}>
              <label className="d-none">Select Date</label>
                <div className="custom-dropdown">
                  <button className="btn" onClick={closeDropdownHandler}>
                    {showText!==''?showText:'Select Date'}
                  </button>
                  {dropdown && (
                    <OutsideClickHandler
                      onOutsideClick={dropdownToggleHandler}
                    >
                      <ul className="custom-date" style={{ marginLeft: '-90px' }}>
                        <li>
                          <span className="label">Quick Dates</span>
                        </li>
                        <li>
                          <span onClick={() => filterByDate(1)}>
                            <div>Today</div>
                          </span>
                          <span onClick={() => filterByDate(2)}>
                            <div>Last 7 Days</div>
                          </span>
                        </li>
                        <li>
                          <span onClick={() => filterByDate(3)}>
                            <div>This month</div>
                          </span>
                          <span onClick={() => filterByDate(4)}>
                            <div>This Year</div>
                          </span>
                        </li>
                        <li>
                          <span onClick={() => filterByDate(5)}>
                            <div>Last Year</div>
                          </span>
                          <span onClick={() => filterByDate(6)}>
                            <div>All time</div>
                          </span>
                        </li>
                        <li>
                          <p className="date-range">Dates Range</p>
                          <div className="date-wrap">
                            <div className="input-group">
                              <input
                                type="date"
                                value={dateDuration.startDate}
                                onChange={(e) =>
                                  setDateDuration({
                                    ...dateDuration,
                                    startDate: e.target.value,
                                  })
                                }
                              />
                              {/* <CalenderIcon /> */}
                            </div>
                            <span className="highphen"></span>
                            <div className="input-group">
                              <input
                                type="date"
                                value={dateDuration.endDate}
                                onChange={(e) =>
                                  setDateDuration({
                                    ...dateDuration,
                                    endDate: e.target.value,
                                  })
                                }
                              />
                              {/* <CalenderIcon /> */}
                            </div>
                          </div>
                        </li>
                        <li>
                          <button
                            className="btn-grey"
                            onClick={dropdownToggleHandler}>
                            Cancel
                          </button>
                          <button
                            className="btn-primary radius"
                            disabled={
                              dateDuration.startDate === '' ||
                              dateDuration.endDate === ''
                                ? true
                                : false
                            }
                            onClick={submitDate}>
                            Apply
                          </button>
                        </li>
                      </ul>
                    </OutsideClickHandler>
                    
                  )}
                </div>
              </div>
              <div className="filter" style={{ marginBottom: '-30px' }}>
                <label>Filter</label>
                <select value='' name='filter' /*onChange={(e) => setFilterSortBy(e)}*/>
                  <option value="">All</option>
                  <option value="1">Test Series</option>
                  <option value="2">Pass</option>
                  <option value="3">Free Test</option>
                </select>
              </div>
            </div>
          </div>
          <div className="testseries-item-wrap testseries-item-wrap-new">
            {
              allData!==null?
                allData.length?
                  allData.map(el => <TestSeriesItem grid={false} item={el} packageData={attemptedTest.packageData} />)
                  :
                  <div className="a-nodata-Content">No Attempted Test Series Available</div>
                :
                <div className="a-nodata-Content">No Attempted Test Series Available</div>
            }
            {/* {filteredDateItems !== null? 
              filteredDateItems.length?
                filteredDateItems.filter((element) => {
                  if (searchText === '') return true;
                  return element.testName
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
                })
                .map((item) => <TestSeriesItem grid={false} item={item} packageData={attemptedTest.packageData} />)
                :
                <div className="a-nodata-Content">No Attempted Test Series Available</div>
              :
              testItems !== null?
                testItems.length?
                  testItems.filter((element) => {
                    if (searchText === '') return true;
                    return element.testName
                      .toLowerCase()
                      .includes(searchText.toLowerCase());
                  }).map((item) => <TestSeriesItem grid={false} item={item} packageData={attemptedTest.packageData} />)
                  :
                  <div className="a-nodata-Content">No Attempted Test Series Available</div>
                :
                <div className="a-nodata-Content">No Attempted Test Series Available</div>
            } */}
          </div>
          {
            filteredDateItems !== null && filteredData(filteredDateItems).length > 0 && filteredData(filteredDateItems).length !== allDataCount && (
              <p className="viewmore">
                <Link to="" onClick={(e) => viewMore(e)}>
                  View More <ArrowDown />
                </Link>
              </p>
            )
          }
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  attemptedTest: selectAttemptedTest,
});

export default connect(mapStateToProps)(AttemptedTest);
