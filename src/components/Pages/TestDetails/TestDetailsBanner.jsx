import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleSignUp } from '../../../redux/actions/auth';

export default function TestDetailsBanner({ data }) {
  const dispatch = useDispatch();

  return (
    <div className="practice-banner">
      <img
        className="banner-img"
        src={require('../../../assets/images/details.jpg')}
        alt=""
      />
      <div class="a-brdcum">
        <div class="a-inner-brdcum">
          <ul>
            <li>
              <Link to={'/'} style={{    color: '#fff'}}>Home &nbsp;&gt;</Link>
            </li>
            <li>
              <b>{data.examDetails?.examType?.examType}</b>
            </li>
          </ul>
        </div>
      </div>
      <div className="banner-top">
        <img src={data?.examDetails?.examName?.logoUrl} alt="" />
        <div className="banner-content">
          <h2>{data.examDetails?.examName?.examName}</h2>
          <p>{data?.examDetails?.brief}</p>
          <div className="banner-bottom">
            <ul>
              {localStorage.getItem('token') === '' && (
                <li>
                  <button
                    className="btn-primary radius"
                    onClick={() => dispatch(toggleSignUp(true))}>
                    Sign up For Free Practice
                  </button>
                </li>
              )}
              <li>
                {data?.examDetails?.totalTest} <span>TOTAL TESTS</span>{' '}
              </li>
              <li>
                {data?.examDetails?.totalQuestion} <span>TOTAL QUESTIONS</span>
              </li>
              <li>
                {data?.examDetails?.testTaken} <span>TESTS TAKEN</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
