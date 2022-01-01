import React, { useState, useEffect } from 'react';
import { toggleSignUp } from '../../../../redux/actions/auth';
import { Heart, HeartFill, Location, Star } from './../../../Core/Layout/Icon';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BASE_URL } from './../../../../config';
import axios from 'axios';

const WideRangeItems = ({ item, idx }) => {
  const [inWishList, setInWishList] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      localStorage.getItem('token') !== '' ||
      localStorage.getItem('token') !== null
    ) {
      if (item.practiceId === undefined) {
        checkInWishList(item.quizId, 'quiz');
      }

      if (item.quizId === undefined) {
        checkInWishList(item.practiceId, 'practice');
      }
    }
  }, [item]);

  //   To check which test package is in whishlist and storing it
  const checkInWishList = async (id, name) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: name === 'practice' ? '2' : '3',
      itemId: id,
    });
    try {
      const {
        data: { data, message },
      } = await axios.post(`${BASE_URL}/wishlist/checkWishList`, body, config);

      if (message !== 'Invalid auth token') {
        setInWishList((inWishList) => [...inWishList, { id, have: data.have }]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //for changing
  const handleWishList = async (id, name) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: name === 'practice' ? '2' : '3',
      itemId: id,
    });
    let selected = inWishList.find((w) => w.id === id).have;
    let updatedIndex;
    try {
      if (selected === 1) {
        const response = await axios.post(
          `${BASE_URL}/wishlist/remove-from-wishlist`,
          body,
          config
        );
        updatedIndex = inWishList.findIndex((w) => w.id === id);
        inWishList[updatedIndex].have = 0;
      }
      if (selected === 0) {
        const response = await axios.post(
          `${BASE_URL}/wishlist/add-to-wishlist`,
          body,
          config
        );
        updatedIndex = inWishList.findIndex((w) => w.id === id);
        inWishList[updatedIndex].have = 1;
      }

      setInWishList([...inWishList]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="a-carousel-item" key={idx}>
      {localStorage.getItem('token') !== '' &&
        localStorage.getItem('token') !== null && (
          <div className="a-wishlist">
            {inWishList.length &&
            inWishList.find((w) =>
              (w.id === item.practiceId) !== undefined
                ? item.practiceId
                : item.quizId
            )?.have === 1 ? (
              <span
                onClick={() => {
                  if (item.practiceId === undefined) {
                    return handleWishList(item.quizId, 'quiz');
                  }
                  if (item.quizId === undefined) {
                    return handleWishList(item.practiceId, 'practice');
                  }
                }}>
                <HeartFill />
              </span>
            ) : (
              <span
                onClick={() => {
                  if (item.practiceId === undefined) {
                    return handleWishList(item.quizId, 'quiz');
                  }
                  if (item.quizId === undefined) {
                    return handleWishList(item.practiceId, 'practice');
                  }
                }}>
                <Heart />
              </span>
            )}
          </div>
        )}

      <span className="a-bggray">
        <h4>{item.practiceSetName || item.quizName}</h4>
        <p>Attempted by {item.totalAttempt}</p>
      </span>

      <div className="a-listItem">
        <div className="a-listTop">
          <div className="a-itemHead">
            <h4>{item.coaching.coachingName}</h4>
            <div className="a-ratingandstars">
              <div className="a-avatarProfile">
                <span
                  style={{
                    backgroundImage: `url(${item.coaching.logoUrl})`,
                  }}></span>
              </div>
              <b>
                <span>
                  <Star />
                </span>{' '}
                {(item.rating &&
                  item.rating.toFixed(1) > 2 &&
                  item.rating.toFixed(1)) ||
                  `-`}
              </b>
              <b>
                (
                {item.ratingCount.toFixed(1) > 2
                  ? `${item.ratingCount} Ratings`
                  : `Not Rated`}
                )
              </b>
            </div>
          </div>

          <p className="a-location">
            <Location /> Kolkata, West Bengal
          </p>

          <p className="a-typeExam">{item.examTypeName}</p>

          <ul className="a-optionDetails">
            {item.practiceSetName && (
              <li>
                {item.practiceSetName && `Total Chapter: ${item.chapterCount}`}
              </li>
            )}

            {item.practiceSetName && (
              <li>
                {item.practiceSetName &&
                  `Total Questions: ${item.questionCount}`}
              </li>
            )}

            {item.practiceSetName && (
              <li>{item.practiceSetName && item.language.languageName}</li>
            )}

            {item.quizName && (
              <li>{item.quizName && `Questions: ${item.questionCount}`}</li>
            )}

            {item.quizName && <li>{item.quizName && `Max. Marks: 150`}</li>}

            {item.quizName && <li>{item.quizName && `Time: 120 Minutes`}</li>}

            {item.quizName && (
              <li>{item.quizName && item.language.languageName}</li>
            )}
          </ul>

          <div className="a-detailsBtn">
            {item.practiceId && (
              <>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    history.push(`/practice-details/${item.practiceId}`)
                  }>
                  Start Practice
                </span>
                {/* <button
                  className="disabled btn-primary radius btn-block"
                  type="button"
                  disabled>
                  COMING SOON
                </button> */}
              </>
            )}
            {item.quizId && (
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (
                    localStorage.getItem('token') === '' ||
                    localStorage.getItem('token') === null
                  ) {
                    return dispatch(toggleSignUp(true));
                  }
                  history.push(`/quizdetails/${item.quizId}`);
                }}>
                Start Quiz
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WideRangeItems;
