import React, { useState, useEffect } from 'react';
import { Layout } from '../Layout/Layout';
import { PostCard } from '../Layout/PostCard/PostCard';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import postImage1 from '../../../assets/images/post-01.jpg';
import postImage2 from '../../../assets/images/post-02.jpeg';
import postImage3 from '../../../assets/images/post-03.jpg';
import avatarImg from '../../../assets/images/post-avatar.png';
import {
  AccuracyIcons,
  AlarmClock,
  DUsers,
  PracticeChapter,
  Quizz,
  RankIcon,
  ScoreIcon,
  TestSeries,
} from '../../Core/Layout/Icon';
import { useDispatch, connect } from 'react-redux';
import { getDashboard } from './../../../redux/Dashboard/dashboard.actions';
import { createStructuredSelector } from 'reselect';
import { selectDashboard } from './../../../redux/Dashboard/dashboard.selectors';
import DashboardCard from './DashboardComponents/DashboardCard';
import DashboardChart from './DashboardComponents/DashboardChart';
import ExpiredSoonItem from './DashboardComponents/ExpiredSoonItem';
import axios from 'axios';
import { BASE_URL } from './../../../config';
import RecentActivities from './DashboardComponents/RecentActivities';
import PassActivities from './DashboardComponents/PassActivities';

const settings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: false,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 1,
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

// 2nd slider
const settings1 = {
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};


const Dashboard = ({ dashboard }) => {
  console.log(`neww`, dashboard)
  const [examTypes, setExamTypes] = useState([]);
  const [blogItems, setBlogItems] = useState([]);
  const [val, setVal] = useState(-1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboard());
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

    async function fetchBlogs() {
      try {
        const {
          data: { data },
        } = await axios.get(`${BASE_URL}/homePage`);

        setBlogItems(data.home_page_blog_lists);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTypes();
    fetchBlogs();
  }, []);

  return (
    <Layout>
      <div className="dashboard-card-items">
        <div className="dashboard-card-inner dashboard-card-inner-new">
          {dashboard &&
            Object.values({
              testAppeared: dashboard.testAppeared,
              score: dashboard.score,
              accuracy: dashboard.accuracy,
              rank: dashboard.rank,
            }).map((data, idx) => <DashboardCard data={data} idx={idx} />)}
        </div>
      </div>
      {dashboard && <DashboardChart dashboard={dashboard} />}

      <div className="filter-headear pt-30">
        <h3>
          Expiring Soon <span className="red">({dashboard && dashboard.expired_soon_packages.length})</span>
        </h3>
        <div className="filter-group expiring-filter">
          <span>Filter by</span>
          <select
            defaultValue={'ALL'}
            onChange={(e) => setVal(Number(e.target.value))}>
            <option value={-1}>ALL</option>
            {dashboard && dashboard.expired_soon_packages.map((x) => x.package_test_types.map((item) => <option value={item.test_type_id}>{item.test_type_name}</option>))}
          </select>
        </div>
      </div>
      <Slider {...settings}>
        {dashboard &&
          dashboard.expired_soon_packages
            .filter((x) => {
              if (val !== -1) {
                let arr = x.package_test_types.map((el) => el.test_type_id);

                return arr.includes(val);
              } else {
                return true;
              }
            })
            .map((el) => <ExpiredSoonItem el={el} />)}
      </Slider>

      <div className="row section-row">
        <RecentActivities />
        <PassActivities />
      </div>

      <div className="recent-post">
        <div className="card">
          <div className="card-header filter-headear">
            <h3 className="">Recent Posts</h3>
            <div className="filter-group">
               <span>Filter by</span>
               <select>
                 <option>ALL</option>
                 <option>Current Affairs</option>
                 <option>Exam notification</option>
                 <option>Result</option>
               </select>
            </div>
          </div>
          <div className="recent-post-blog">
            <Slider {...settings1}>
            {blogItems.map((item) => (
              <PostCard key={item.id} item={item} />
            ))} 
            </Slider>   
          </div>
          <span
            className="view">
              <a href="https://admisure.com/blog" target="_blank">
            View More
            <img
              src={require('../../../assets/images/view-more.svg')}
              alt=""
            />
            </a>
          </span>  
        </div>
      </div>

      <div className="reg-wrapper">
        <div className="card">
          <ul className="reg-list">
            <li>
              <div className="content">
                <DUsers />
                <span className="label">
                  {dashboard && dashboard.totalStudent}
                </span>
              </div>
              <p className="name">Registered Users</p>
            </li>
            <li>
              <div className="content">
                <TestSeries />
                <span className="label">
                  {dashboard && dashboard.totalTestPackage}
                </span>
              </div>
              <p className="name">Test Series</p>
            </li>
            <li>
              <div className="content">
                <PracticeChapter />
                <span className="label">
                  {dashboard && dashboard.totalPracticeSet}
                </span>
              </div>
              <p className="name">Practice Sets</p>
            </li>
            <li>
              <div className="content">
                <Quizz />
                <span className="label">
                  {dashboard && dashboard.totalQuiz}
                </span>
              </div>
              <p className="name">Quizzes</p>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  dashboard: selectDashboard,
});

export default connect(mapStateToProps)(Dashboard);
