import React from 'react';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import { Arrow, Location, Star } from '../../../../Core/Layout/Icon';
import Carousel from './../../../Elements/Carousel';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectQuizReport } from '../../../../../redux/quiz/quiz.selectors';
import { useHistory } from 'react-router-dom';

const SimilarQuiz = ({ report }) => {
  const history = useHistory();

  const myArrow = ({ type, onClick, isEdge }) => {
    const carlPointer = type === consts.PREV ? <Arrow /> : <Arrow />;
    const carlClass = type === consts.PREV ? 'prev' : 'next';
    return (
      <button
        className={`a-btn-arrow ${carlClass}`}
        onClick={onClick}
        disabled={isEdge}>
        {carlPointer}
      </button>
    );
  };

  const breakPoints = [
    { width: 2, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1 },
    { width: 850, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 4 },
    { width: 1750, itemsToShow: 4 },
  ];

  return (
    Object.keys(report).length > 0 && (
      <div className="similar-quiz">
        <div className="a-container">
          <h2>
            Similar Quiz
          </h2>
          <Carousel heading={''}>
            <ReactCarousel
              itemsToShow={4}
              itemsToScroll={1}
              breakPoints={breakPoints}
              renderArrow={myArrow}>
              {report.similarQuiz.map((item) => (
                <div className="a-carousel-item" key={item}>
                  {/* <div className="a-wishlist">
			<span>
			  <Heart />
			</span>
		  </div> */}
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
                                  backgroundImage: `url(${item?.coaching?.logoUrl})`,
                                }}></span>
                            ) : (
                                <span
                                  style={{
                                    backgroundImage: `url('https://via.placeholder.com/40x40?text=${item?.coaching?.coachingName}')`,
                                  }}></span>
                              )}
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
                            {' '}
                            (
                            {item.ratingCount.toFixed(1) > 2
                              ? `${item.ratingCount} Ratings`
                              : `Not Rated`}
                            )
                          </b>
                        </div>
                      </div>

                      <p className="a-location">
                        <span><Location /></span> {item?.coaching?.city?.city}, {item.coaching?.state?.name}
                      </p>

                      <p className="a-typeExam">{item.examType.examType}</p>

                      <ul className="a-optionDetails">
                        <li>
                          Total Chapter: {item?.coaching?.totalPracticeChapters}
                        </li>
                        <li>Total Questions: {item.questionCount}</li>
                        <li>Time: {item.duration} Minutes</li>
                        <li>{item.language.languageName}</li>
                      </ul>

                      <div className="a-detailsBtn">
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            {
                              localStorage.removeItem('QuizTime');
                              window.location.pathname = `/quizdetails/${item.id}`;
                              //history.push(`/quizdetails/${item.id}`)
                          }
                          }>
                          Start Quiz
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ReactCarousel>
          </Carousel>
        </div>
      </div>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  report: selectQuizReport,
});

export default connect(mapStateToProps)(SimilarQuiz);
