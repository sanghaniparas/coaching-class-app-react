import React from 'react';
import {
  Arrow,
  Heart,
  Star,
  University,
  Location,
  HeartFill,
} from '../../../Core/Layout/Icon';
import { useHistory } from 'react-router-dom';
import { updateWishListQuiz } from './../../../../redux/MyProfile/profile.actions';
import { useDispatch } from 'react-redux';
import { BASE_URL } from './../../../../config';
import axios from 'axios';

const QuizItem = ({ item }) => {
  const history = useHistory();

  const routerPracticePageChange = (id) => {
    let path = `/quizdetails/${id}`;
    history.push(path);
  };

  const dispatch = useDispatch();
  //   Remove from wishlist on click
  const handleRemoveWishList = async (id) => {
    dispatch(updateWishListQuiz(id));
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };
    const body = JSON.stringify({
      itemId: id,
      itemType: '3',
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/wishlist/remove-from-wishlist`,
        body,
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="a-carousel-item">
      <div className="a-wishlist">
        <span onClick={() => handleRemoveWishList(item.id)}>
          <HeartFill />
        </span>
      </div>
      <span className="a-bggray">
        <h4>{item.quizName}</h4>
        <p>Attempted by {item.totalAttempt}</p>
      </span>
      <div className="a-listItem">
        <div className="a-listTop">
          <div className="a-itemHead">
            <h4>{item.coaching.coachingName}</h4>
            <div className="a-ratingandstars">
              <div className="a-avatarProfile">
                {item.coaching.logoUrl !== null ? (
                  <span
                    style={{
                      backgroundImage: `url(${item.coaching.logoUrl})`,
                    }}></span>
                ) : (
                  <span
                    style={{
                      backgroundImage: `url('https://via.placeholder.com/40x40?text=${item.coaching.coachingName}')`,
                    }}></span>
                )}
              </div>
              {!item.rating ? (
                <b>
                  <span>
                    <Star />
                  </span>{' '}
                  -
                </b>
              ) : (
                <b>
                  <span>
                    <Star />
                  </span>
                  {/* {item.rating.toFixed(1)} */}
                  {(item.rating &&
                    item.ratingCount.toFixed(1) > 2 &&
                    item.rating.toFixed(1)) ||
                    `-`}
                </b>
              )}

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
            <span>
              <Location />
            </span>{' '}
            {item?.coaching?.city?.city}, {item?.coaching?.state?.name}
          </p>
          <p className="a-typeExam">
            {!item.examType ? '' : item.examType.examType}
            {'  '}
          </p>
          <ul className="a-optionDetails">
            <li>Total Questions: {item.questionCount}</li>
            <li>
              {' '}
              {!item.language ? '' : item?.language?.languageName}
              {'  '}
            </li>
            <li>Duration: {item.duration}</li>
          </ul>
          {item.isPublished === 1 && item.status === 5 ? (
            <>
              <div
                className="a-detailsBtn"
                onClick={() => routerPracticePageChange(item.id)}>
                <span>Start Quiz</span>
              </div>
            </>
          ) : (
            <>
              <div className="a-detailsBtn">
                <button
                  className="disabled btn-primary radius btn-block"
                  type="button"
                  disabled>
                  UNAVAILABLE
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizItem;
