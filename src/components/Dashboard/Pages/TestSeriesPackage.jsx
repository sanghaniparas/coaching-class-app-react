import React, { useState, useEffect } from 'react';
import { getTestPackages } from '../../../redux/Dashboard/dashboard.actions';
import { Layout } from '../../Dashboard/Layout/Layout';
import { Switch } from '../../Dashboard/Layout/Switch/Switch';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTestPackages } from '../../../redux/Dashboard/dashboard.selectors';
import { BASE_URL } from './../../../config';
import axios from 'axios';
import { TestPackage } from './TestSeriesComponents/TestPackage';
const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: `${localStorage.token}`,
  },
};
const TestSeriesPackage = ({ testPackages }) => {
  const [examPreference, setExamPreference] = useState([]);
  const [isOn, setisOn] = useState(true);
  const [examTypes, setExamTypes] = useState([]);
  const [data, setData] = useState([]);
  const [examTypeId, setExamTypeId] = useState('');
  const [sortBy, setSortBy] = useState('1');
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();

  const handleToggle = () => {
    let filterSaleType = 0;
    if(isOn) {
      filterSaleType = 4;
    } else {
      filterSaleType = 1;
    }
    let searchDataValue = [];
    if(searchText.trim()==='') {
      searchDataValue = testPackages;
    } else {
      searchDataValue = testPackages.filter((element) => element.packageName.toLowerCase().includes(searchText.trim().toLowerCase()));
    }
    let filterSaleTypeData = searchDataValue.filter(c => c.saleType === filterSaleType);
    setData(filterSaleTypeData);
    setisOn(!isOn);
  };

  useEffect(() => {
    async function fetchTypes() {
      try {
        const {
          data: { data },
        } = await axios.get(`${BASE_URL}/misc/examType`);
        setExamTypes(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function getExamPreferences() {
      try {
        const { data: { data } } = await axios.get(
          `${BASE_URL}/profile/getExamPreference`,
          config
        );
        setExamPreference(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTypes();
    getExamPreferences();
  }, []);

  //   For fetching test packages
  useEffect(() => {
    const obj = {
      search_key: '',
      package_sort_by: sortBy,
      exam_type: examTypeId,
    };
    dispatch(getTestPackages(obj));
  }, [examTypeId, sortBy]);

  useEffect(() => {
    if (testPackages !== null) {
      // setData(testPackages);
      let toggleVal = 0;
      if(isOn) {
        toggleVal = 1;
      } else {
        toggleVal = 4;
      }
      let dataAssets = testPackages.filter(c => c.saleType === toggleVal);
      setData(dataAssets);
    }
  }, [testPackages]);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    let searchdata = [];
    let sellTypeSearchData = isOn?1:4;
    let stepOneData = testPackages.filter((element) => element.saleType === sellTypeSearchData);
    if(e.target.value.trim()!=='') {
      searchdata = stepOneData.filter((element) => element.packageName.toLowerCase().includes(e.target.value.trim().toLowerCase()));
      setData(searchdata);
    } else {
      setData(stepOneData);
    }
  }
  
  return (
    <Layout>
      <div className="card">
        <form action="">
          <div className="test-package-filter">
            <div className="form-group select">
              <label htmlFor="">Exam Type</label>
              <select onChange={(e) => setExamTypeId(e.target.value)}>
                <option value="">ALL</option>
                {examTypes.map((el) => (
                  // <option value={el.id}>{el.examType}</option>
                  <> 
                    {examPreference.indexOf(el.id)!==-1 && <option value={el.id}>{el.examType}</option>}
                  </>
                ))}
              </select>
            </div>
            <div className="form-group search">
              <label htmlFor="">Search</label>
              <div className="input-group">
                <img
                  src={require('../../../assets/images/search.svg')}
                  alt=""
                />
                <input
                  type="text"
                  placeholder="Select and search coaching, package"
                  value={searchText}
                  // onChange={(e) => setSearchText(e.target.value)}
                  onChange={(e) => handleSearchText(e)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {testPackages === null ? (
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
        <>
          <div className="filter-headear pt-10 testseries-new-blk">
            <h3>
              Packages <span className="grey">({data.length})</span>
            </h3>
            <div className="filter-group">
              <div className="item-group">
                <label htmlFor="">Purchased</label>
                <Switch isOn={isOn} handleToggle={handleToggle} />
              </div>
              <div className="item-group filter-bg">
                <label>Sort by</label>
                <select onChange={(e) => setSortBy(e.target.value)}>
                  <option value="1">A-Z</option>
                  <option value="2">Z-A</option>
                </select>
              </div>
            </div>
          </div>
          
          {data.length > 0 ? data
            .map((item) => (
              <TestPackage testPackage={item} sortBy={sortBy} />
            )):<div className="a-nodata-Content">No Test Series Available</div>}
        </>
      )}
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  testPackages: selectTestPackages,
});

export default connect(mapStateToProps)(TestSeriesPackage);
