import React, { useState, useEffect } from 'react';
import { ArrowDown, GridItemView, ListItemIcon, DropDown } from '../../Core/Layout/Icon';
import { Layout } from '../Layout/Layout';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import TestSeriesItem from './TestSeriesComponents/TestSeriesItem';
import { selectTestSeries } from './../../../redux/Dashboard/dashboard.selectors';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { fetchTestSeries } from './../../../redux/Dashboard/dashboard.actions';


const TestSeries = ({ testSeries, match }) => {
  const [allTest, setAllTest] = useState([]);
  const [list, setlist] = useState(true);
  const [grid, setgrid] = useState(false);
  const [idx, setIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(-1);
  const [subTabFilter, setSubTabFilter] = useState(-1);
  const [sortFilterBy, setSortFilterBy] = useState({filter: '', sort: '1'});
  const [visibleTestCount, setVisibleTestCount] = useState(0);
  const [allData, setAllData] = useState([]);
  const [sliceNumber, setSliceNumber] = useState(0);
  // const sliceNumber = 2; 
  const dispatch = useDispatch();

  const listToggle = () => {
    let listToggleSLiceNumber = 5;
    let sliceTestSeries = allData.slice(0, listToggleSLiceNumber);
    setVisibleTestCount(sliceTestSeries.length);
    setAllTest(sliceTestSeries);
    setSliceNumber(listToggleSLiceNumber);
    setlist(true);
    setgrid(false);
  };
  const gridToggle = () => {
    let listToggleSLiceNumber = 8;
    let sliceTestSeries = allData.slice(0, listToggleSLiceNumber);
    setVisibleTestCount(sliceTestSeries.length);
    setAllTest(sliceTestSeries);
    setSliceNumber(listToggleSLiceNumber);
    setgrid(true);
    setlist(false);
  };

  //   For dispatching action
  useEffect(() => {
    dispatch(
      fetchTestSeries({
        testPackageId: match.params.packageId,
        testSortBy: sortFilterBy.sort,
        testAppeared: sortFilterBy.filter,
      })
    );
  }, []);

  //   For reinitializing state
  useEffect(() => {
    setSubIdx(-1);
    setSubTabFilter(-1);
  }, [idx]);


  useEffect(() => {
    
    if(testSeries) {
      let otherFilteredData = testSeries.allTests.filter((x) => x.examNameId === testSeries.examNameExamTypeGroup[idx].examName.id).filter((x) => {
        if (subTabFilter === -1) return true;
        return x.packageTestType.id === subTabFilter;
      });
      setAllData(otherFilteredData);
    } else {
      setAllData([]);
      setAllTest([]);
    }
    
  }, [testSeries]);

  useEffect(() => {
    list?listToggle():gridToggle();
  }, [allData]);

  const viewMore = () => {
    let counterIncrement = list?2:4;
    let newTestCount = visibleTestCount + counterIncrement;
    let sliceTestSeries = allData.slice(0, newTestCount);
    setVisibleTestCount(sliceTestSeries.length);
    setAllTest(sliceTestSeries);
  }

  const setFilterSortBy = (e) => {
    e.persist();
    setSortFilterBy(sortFilterBy => ({
      ...sortFilterBy,
      [e.target.name]: e.target.value
    }));
  }

  useEffect(() => {
    dispatch(
      fetchTestSeries({
        testPackageId: match.params.packageId,
        testSortBy: sortFilterBy.sort,
        testAppeared: sortFilterBy.filter,
      })
    );
  },[sortFilterBy])

  return (
    <>
      {testSeries === null ? (
        <div style={{ minHeight: '100vh' }}>
          <Loader
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            type="Oval"
            color="#FF7249"
            height={40}
            width={40}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
        <Layout>
          <div className="a-test-series">
            <div className="a-tes-doc a-test-infoseries">
              <ul className="a-test-tab-exam">
                {testSeries.examNameExamTypeGroup.map((x, index) => (
                  <li
                    className={idx === index && 'a-activeTb'}
                    onClick={() => {
                      let upperFilteredData = testSeries.allTests.filter((x) => x.examNameId === testSeries.examNameExamTypeGroup[index].examName.id).filter((x) => {
                        if (subTabFilter === -1) return true;
                        return x.packageTestType.id === subTabFilter;
                      });
                      let upperSliceTestSeries = upperFilteredData.slice(0, sliceNumber);
                      setAllData(upperFilteredData);
                      setVisibleTestCount(upperSliceTestSeries.length);
                      setAllTest(upperSliceTestSeries);

                      setIdx(index);
                    }}>
                    {x.examName.examName}
                    <span className="examname_drop" style={{ display: 'none' }}><DropDown/></span>
                  </li>
                ))}
              </ul>
              <div className="a-test-bottom">
                <ul className="a-test-subtab-exam">
                  <li
                    className={subIdx === -1 && 'subtab-selected'}
                    onClick={() => {
                      let allIndexNo = -1;
                      let allTabFilteredData = testSeries.allTests.filter((x) => x.examNameId === testSeries.examNameExamTypeGroup[idx].examName.id).filter((x) => {
                        if (allIndexNo === -1) return true;
                        return x.packageTestType.id === allIndexNo;
                      });
                      let allTabSliceTestSeries = allTabFilteredData.slice(0, sliceNumber);
                      setAllData(allTabFilteredData);
                      setVisibleTestCount(allTabSliceTestSeries.length);
                      setAllTest(allTabSliceTestSeries);


                      setSubIdx(-1);
                      setSubTabFilter(-1);
                    }}>
                    All(
                    {testSeries.length}
                    )
                  </li>
                  {testSeries.examNameExamTypeGroup
                    .find((el, index) => index === idx)
                    .packageTestTypes.map((otherX, index) => (
                      <li
                        className={subIdx === index && 'subtab-selected'}
                        onClick={() => {
                          let otherTabFilteredData = testSeries.allTests.filter((x) => x.examNameId === testSeries.examNameExamTypeGroup[idx].examName.id).filter((x) => {
                            if (otherX.packageTestTypeId === -1) return true;
                            return x.packageTestType.id === otherX.packageTestTypeId;
                          });
                          let sliceTabTestSeries = otherTabFilteredData.slice(0, sliceNumber);
                          setAllData(otherTabFilteredData);
                          setVisibleTestCount(sliceTabTestSeries.length);
                          setAllTest(sliceTabTestSeries);


                          setSubIdx(index);
                          setSubTabFilter(otherX.packageTestTypeId);
                        }}>
                        {otherX.packageTestTypeName} ({otherX.packageTestTypeCount})
                      </li>
                    ))}
                </ul>
                <div className="list-grid-wrapper list-grid-wrapper_testseries">
                  <span className="list" onClick={listToggle}>
                    {list?<ListItemIcon fill='#ff7249' />:<ListItemIcon fill='rgba(0,0,0,0.38)' />}
                  </span>
                  <span className="grid" onClick={gridToggle}>
                    {grid?<GridItemView fill='#ff7249' />:<GridItemView fill='rgba(0,0,0,0.38)' />}
                  </span>
                </div>
              </div>
            </div>
            <div className="a-tes-doc a-test-listseries">
              <div className="filter-headear pt-10 testseries-filter-right">
                <div className="filter-group testseries-filter">
                  {/* <div className="item-group">
                    <label htmlFor="">Purchased</label>
                    <Switch isOn={isOn} handleToggle={handleToggle} />
                  </div> */}
                  <div className="item-group">
                    <label>Filter</label>
                    <select value={sortFilterBy.filter} name='filter' onChange={(e) => setFilterSortBy(e)}>
                      <option value="">All</option>
                      <option value="1">Appeared</option>
                      <option value="2">Not Appeared</option>
                    </select>
                  </div>
                  <div className="item-group">
                    <label>Sort by</label>
                    <select value={sortFilterBy.sort} name='sort' onChange={(e) => setFilterSortBy(e)}>
                      <option value="1">A-Z</option>
                      <option value="2">Z-A</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="testseries-item-wrap">
              {allTest.length? allTest.map((item) => (
                  <TestSeriesItem grid={grid} item={item} packageData={testSeries.packageData} />
                )):<div className="a-nodata-Content">No Test Series Available</div>}
               </div> 
              {
                (allData.length > visibleTestCount && list) && (<div className="viewmore"><span onClick={() => viewMore()}>View More <ArrowDown/> </span></div>)
              }
              
            </div>
            {
              (allData.length > visibleTestCount && grid) && (<div className="viewmore"><span onClick={() => viewMore()}>View More <ArrowDown/> </span></div>)
            }
          </div>
        </Layout>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  testSeries: selectTestSeries,
});

export default connect(mapStateToProps)(TestSeries);
