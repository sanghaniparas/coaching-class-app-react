import React, { Fragment, useEffect, useState } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { LineArrow } from '../../../Core/Layout/Icon';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { selectFollowings } from './../../../../redux/MyProfile/profile.selectors';
import {
  getFollowings,
  filterFollowings,
} from './../../../../redux/MyProfile/profile.actions';
import FollowedCoaching from './../components/FollowedCoaching';
import { BASE_URL } from './../../../../config';
import axios from 'axios';

const Following = ({ followings }) => {
  const [examType, setExamType] = useState([]);
  const [count, setCount] = useState(3);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getFollowings());

    (async function fetchExamList() {
      try {
        const {
          data: { data },
        } = await axios.get(`${BASE_URL}/misc/examType`);

        setExamType(data);
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      document.getElementsByTagName('html')[0].style = '';
    };
  }, []);

  //   For changing filter
  const handleChange = (e) => {
    if (e.target.value === 'all') {
      return dispatch(getFollowings());
    }

    dispatch(filterFollowings(parseInt(e.target.value)));
  };

  return (
    <div className="following-wrapper">
      <div className="header-filter">
        <div className="left-content">
          <h3>Following ({followings && followings.count})</h3>
          {followings !== null && followings.coachings.length !== 0 ? (
            <p>Manage your followers</p>
          ) : (
            ''
          )}
        </div>
        <div className="filter-group">
          <select name="" id="" onChange={handleChange}>
            <option value="all">All Exam</option>
            {examType.length &&
              examType.map((el) => (
                <option value={el.id}>{el.examType}</option>
              ))}
          </select>
        </div>
      </div>
      {followings !== null && followings.coachings.length !== 0 && (
        <>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Coaching Name</th>
                  <th>Exam Type</th>
                  <th>Total Tests</th>
                  <th>Followers</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {followings.coachings.slice(0, count).map((item, idx) => (
                  <Fragment key={idx}>
                    <FollowedCoaching item={item}  />
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {count < followings.coachings.length && (
            <div
              className="read-more"
              onClick={() => setCount((count) => count + 3)}>
              View More <LineArrow />
            </div>
          )}
        </>
      )}

      {followings !== null && followings.coachings.length === 0 && (
        <h1>You are not following any coaching!</h1>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  followings: selectFollowings,
});

export default connect(mapStateToProps)(Following);
