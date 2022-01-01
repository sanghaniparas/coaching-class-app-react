import React, { useState, useEffect } from 'react';
import {
  ArrowDown,
  AlarmClock,
  GridItemView,
  ListItemIcon,
  PackageIcon,
  QuestionIcon,
  TestAppearIcon,
} from '../../Core/Layout/Icon';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PassCard from '../../Pages/Pass/PassCard';
import { useDispatch, connect } from 'react-redux';
import { getPassCoachings } from '../../../redux/Dashboard/dashboard.actions';
import { createStructuredSelector } from 'reselect';
import { selectPassCoachings } from '../../../redux/Dashboard/dashboard.selectors';
import { getPassCards } from './../../../redux/Dashboard/dashboard.actions';
import { selectPassTestCards } from './../../../redux/Dashboard/dashboard.selectors';
import { selectTestSeries } from './../../../redux/Dashboard/dashboard.selectors';
import TestSeriesItem from './TestSeriesComponents/TestSeriesItem';
import { BASE_URL } from './../../../config';
import axios from 'axios';

import { Layout } from '../Layout/Layout';
import { Link } from 'react-router-dom';
const items = [
  {
    passId: 1,
    passName: 'Sure Plus',
    passImgName: 'plus',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12',
  },
  {
    passId: 2,
    passName: 'Sure Pro',
    passImgName: 'pro',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12',
  },
  {
    passId: 3,
    passName: 'Sure Premium',
    passImgName: 'premium',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12',
  },
  {
    passId: 4,
    passName: 'Sure Plus 2',
    passImgName: 'plus',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12',
  },
  {
    passId: 5,
    passName: 'Sure Pro',
    passImgName: 'pro',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12',
  },
  {
    passId: 6,
    passName: 'Sure Premium',
    passImgName: 'premium',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12',
  },
];
const settings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  variableWidth: false,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const PassAccess = ({ coachings, passCards, testSeries }) => {

  console.log("testSeries ***", testSeries);
  const [list, setlist] = useState(false);
  const [grid, setgrid] = useState(false);
  const [testid, setTestId] = useState(-1);
  const [coachingId, setCoachingId] = useState('');
  const [coachingDetails, setCoachingDetails] = useState(null);
  const [examPackageId, setExamPackageId] = useState(null);
  const [examTypeId, setExamTypeId] = useState(null);
  const [filterPackages, setFilterPackages] = useState(null);
  const [testItems, setTestItems] = useState(null);
  const [passItems, setPassItems] = useState(null);
  const [sortFilterBy, setSortFilterBy] = useState({ filter: '', sort: '1' });

  const dispatch = useDispatch();
  const listToggle = () => {
    setlist(true);
    setgrid(false);
  };
  const gridToggle = () => {
    setgrid(true);
    setlist(false);
  };

  //   To get pass access coachings
  useEffect(() => {
    dispatch(getPassCoachings());
  }, []);

  // and set coaching Id to local state
  useEffect(() => {
    if (coachings !== null && coachings.length !== 0) {
      setCoachingId(coachings[0].id);
    }
  }, [coachings]);

  //   for getting details with selected coahing id examTypeId
  useEffect(() => {
    console.log("coachings ***", coachings);
    if (coachingId && coachings) {
      setCoachingDetails(coachings.find((el) => el.id === coachingId));
    }
  }, [coachingId, coachings]);

  useEffect(() => {
    if (coachingDetails !== null) {
      setExamPackageId({
        examTypeId: coachingDetails.examType[0].id.toString(),
        testPackageId: coachingDetails.testPackage[0].id.toString(),
      });
      setExamTypeId(
        coachingDetails.examType[0].id.toString(),
      );
    }
  }, [coachingDetails]);



  useEffect(() => {

    if (examTypeId !== null) {
      //let x = coachingDetails.testPackage.filter((x) => Number(x.examTypeId) === Number(examTypeId))
      setFilterPackages(coachingDetails.testPackage.filter((x) => x.examTypeIds.includes(Number(examTypeId))))

      //setFilterPackages(coachingDetails.testPackage.examTypeIds.includes(Number(examTypeId)))
      // setFilterPackages(coachingDetails.testPackage.filter((x) => includes(x.examTypeId)))

      console.log("filter packages", filterPackages);

    }

  }, [examTypeId])

  useEffect(() => {

  }, [filterPackages])

  useEffect(() => {
    if (examPackageId !== null) {
      dispatch(getPassCards(examPackageId));
    }

    setTestId(-1);
  }, [examPackageId]);

  useEffect(() => {
    if (passCards) {
      if (testid === -1) {
        setTestItems(passCards.allTests);

      } else {
        let arr = passCards.allTests.filter(
          (el) => el.packageTestType.id === testid
        );
        setTestItems(arr);
      }
    }
  }, [testid, passCards]);

  //   For getting passes
  useEffect(() => {
    async function getPasses() {
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
          `${BASE_URL}/dashboard/dashboard/pass_access_pass_list`,
          config
        );

        setPassItems(data);
      } catch (error) {
        console.log(error);
      }
    }

    getPasses();
  }, []);
  const setFilterSortBy = (e) => {
    e.persist();
    setSortFilterBy(sortFilterBy => ({
      ...sortFilterBy,
      [e.target.name]: e.target.value
    }));
  }
  return coachings === null ? (
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

        {coachings.length !== 0 ? (
          <>
            <div className="dashboard-card-items passaccess-block">
              <div className="dashboard-card-inner passaccess">
                <div className="passacess-card">
                  {coachingDetails && coachingDetails.logoUrl !== null ? <span
                    style={{
                      backgroundImage: `url(${coachingDetails?.logoUrl})`,
                      width: "50px",
                      height: "50px",
                      borderRadius: "25px",
                      backgroundSize: "cover",
                      overflow: "hidden",
                      marginRight: "1rem"
                    }}></span> : <span
                      style={{
                        backgroundImage: `url('https://via.placeholder.com/40x40?text=${coachingDetails?.coachingName}')`,
                        width: "50px",
                        height: "50px",
                        borderRadius: "25px",
                        backgroundSize: "cover",
                        overflow: "hidden",
                        marginRight: "1rem"
                      }}></span>}




                  <div className="info title">
                    <h2>{coachingDetails && coachingDetails.coachingName}</h2>
                    <p>
                      {coachingDetails && coachingDetails.city.city},{' '}
                      {coachingDetails && coachingDetails.state.name}
                    </p>
                  </div>
                </div>
                <div className="passacess-card">
                  <span className="icon">
                    <PackageIcon />
                  </span>
                  <div className="info">
                    <h2>Package Details</h2>
                    <p>
                      Appeared:{' '}
                      {coachingDetails && coachingDetails.total_appeared_package}/
                  {coachingDetails && coachingDetails.total_package}
                    </p>
                  </div>
                </div>
                <div className="passacess-card">
                  <span className="icon">
                    <TestAppearIcon fill="#fd8041" />
                  </span>
                  <div className="info">
                    <h2>Test Details</h2>
                    <p>
                      Appeared:{' '}
                      {coachingDetails && coachingDetails.total_appeared_test}/
                  {coachingDetails && coachingDetails.total_test}
                    </p>
                  </div>
                </div>
                <div className="passacess-card">
                  <span className="icon">
                    <QuestionIcon />
                  </span>
                  <div className="info">
                    <h2>Question Details</h2>
                    <p>
                      Appeared:{' '}
                      {coachingDetails &&
                        coachingDetails.total_appeared_test_question}
                  /{coachingDetails && coachingDetails.total_test_question}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="passcard-carousel">
              <h3>
                Select Coaching:{' '}
                <select onChange={(e) => setCoachingId(Number(e.target.value))}>
                  {coachings.map((coaching) => (
                    <option value={coaching.id}>
                      {coaching.coachingName}, {coaching.city.city}
                    </option>
                  ))}
                </select>
              </h3>
              <Slider {...settings}>
                {passItems &&
                  passItems.map((item) => <PassCard key={item.id} item={item} hideBuyBtn={item} />)}
              </Slider>
            </div>
            <div className="a-test-series">
              <div className="a-tes-doc a-test-infoseries">
                <div className="a-test-type-packages">
                  <div className="a-test-selectBox passaccess_select">
                    <p>Exam Type</p>
                    <select
                      value={examPackageId && examPackageId.examTypeId}
                      onChange={(e) => {
                        setExamPackageId({
                          ...examPackageId,
                          examTypeId: e.target.value,
                        })
                        setExamTypeId(e.target.value)
                      }

                      }>
                      {coachingDetails &&
                        coachingDetails.examType.map((type) => (
                          <option value={type.id}>{type.examType}</option>
                        ))}
                    </select>
                  </div>
                  <div className="a-test-selectBox passaccess_select">
                    <p>Test Packages</p>
                    <select
                      value={examPackageId && examPackageId.testPackageId}
                      onChange={(e) =>
                        setExamPackageId({
                          ...examPackageId,
                          testPackageId: e.target.value,
                        })
                      }>
                      {filterPackages &&
                        filterPackages.map((p) => (
                          <option value={p.id}>{p.packageName}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="a-test-bottom">
                  <ul className="a-test-subtab-exam">
                    <li
                      className={testid === -1 && 'subtab-selected'}
                      onClick={() => setTestId(-1)}>
                      All
                </li>
                    {passCards &&
                      passCards.examNameExamTypeGroup.map((el) =>
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
                  <div className="list-grid-wrapper">
                    <span className="list" onClick={listToggle}>
                      <ListItemIcon />
                    </span>
                    <span className="grid" onClick={gridToggle}>
                      <GridItemView />
                    </span>
                  </div>
                </div>
              </div>
              {testItems?.length > 0 ?
                <div className="a-tes-doc a-test-listseries">

                  <div className="filter-headear pt-10">
                    <h3>Tests Attempted</h3>

                    <div className="filter-group pass_filter">
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
                    {testItems &&
                      testItems.map((item) => 
                        <TestSeriesItem grid={grid} item={item} packageData={testSeries?.packageData} />
                      )}
                  </div>
                  {/* <p className="viewmore">
                    <Link to="">
                      View More <ArrowDown />
                    </Link>
                  </p> */}
                </div> : <div className="a-tes-doc a-test-listseries"> <div className="a-nodata-Content">
                  No Data Available
            </div> </div>}
            </div>
          </>

        ) : (

            <div className="a-nodata-Content">
              No Data Available
            </div>

          )}




      </Layout>
    );
};

const mapStateToProps = createStructuredSelector({
  coachings: selectPassCoachings,
  passCards: selectPassTestCards,
  testSeries: selectTestSeries,
});

export default connect(mapStateToProps)(PassAccess);
