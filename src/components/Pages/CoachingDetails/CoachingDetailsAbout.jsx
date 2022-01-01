import React, { useState } from 'react';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import AboutRelated from './AboutRelated';
import Carousel from '../Elements/Carousel';
import {
  Arrow,
  Location,
  ModalClose,
  TestSeries,
} from '../../Core/Layout/Icon';
import moment from 'moment';
import { Modal } from '../../Core/Layout/Modal/Modal';
import { useToasts } from 'react-toast-notifications';

export default function CoachingDetailsAbout({ detailsAbout }) {

  console.log("details", detailsAbout);
  const [toggle, setToggle] = useState(false);

  const [reportModal, setreportModal] = useState(false);
  const { addToast } = useToasts();
  const toggleModal = () => {
    setreportModal(!reportModal);
  };
  const closeModal = () => {
    setreportModal(false);
  };
  const submitModal = () => {
    addToast('Report submitted successfully!', {
      appearance: 'success',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    setreportModal(false);
  }

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
    { width: 2, itemsToShow: 2 },
    { width: 550, itemsToShow: 3, itemsToScroll: 1 },
    { width: 850, itemsToShow: 5, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 6, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 6 },
    { width: 1750, itemsToShow: 6 },
  ];

  return (
    <>
      <div className="a-aboutCoaching">
        {detailsAbout.details == null ? <div className="a-aboutWrapper gray-a-bg">
          <div className="a-container">
            <div className="a-aboutInner">
              <div className="a-about-header">
                <h4>Description</h4>
                <div className="a-nodata-Content">No Data Available</div>
                {/* <div className="a-about-info">
                  <p> No Description </p>

                </div> */}
              </div>
            </div>
          </div>
        </div>
          : (
            <div className="a-aboutWrapper gray-a-bg">
              <div className="a-container">
                <div className="a-aboutInner">
                  <div className="a-about-header">
                    <h4>Description</h4>
                    <div className="a-about-info">
                      <small>
                        <strong>Joined on:</strong>
                        <span>
                          {detailsAbout &&
                            moment(detailsAbout.createdAt).format('MMMM Do YYYY')}
                        </span>
                      </small>
                      <small onClick={toggleModal}>
                        <i className="fas fa-flag"></i>
                      Report Coaching
                    </small>
                    </div>
                  </div>
                  <p>
                    {!toggle
                      ? detailsAbout.details.slice(0, 400)
                      : detailsAbout.details}

                    {toggle ? (
                      <span
                        onClick={() => setToggle(!toggle)}
                        style={{
                          color: '#ff7149',
                          marginLeft: '6px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}>
                        Read Less
                      </span>
                    ) : (
                        <span
                          onClick={() => setToggle(!toggle)}
                          style={{
                            color: '#ff7149',
                            marginLeft: '6px',
                            fontWeight: '600',
                            cursor: 'pointer',
                          }}>
                          Read More
                        </span>
                      )}
                  </p>
                </div>
              </div>
            </div>
          )}
        {detailsAbout && detailsAbout.faculties.length > 0 ? (
          <div className="a-aboutWrapper">
            <div className="a-container">
              <div className="a-aboutInner">
                <Carousel heading="Faculty Details">
                  <ReactCarousel
                    itemsToShow={6}
                    itemsToScroll={1}
                    breakPoints={breakPoints}
                    renderArrow={myArrow}>
                    {detailsAbout.faculties.map((faculty, ids) => (
                      <div className="a-carousel-about-item" key={ids}>
                        <span>
                          {!!faculty.pictureUrl && (
                            <img
                              src={faculty.pictureUrl}
                              alt={faculty.facultyName}
                            />
                          )}
                          {!faculty.pictureUrl && (
                            <img
                              src={`https://via.placeholder.com/40x40?text=${faculty.facultyName}`}
                              alt={faculty.facultyName}
                            />
                          )}
                        </span>
                        <h4>{faculty.facultyName}</h4>
                        <p>Experience: {faculty.experience} years</p>
                        <b>
                          {faculty.subjects &&
                            faculty.subjects.map((el, i) =>
                              faculty.subjects.length - 1 === i
                                ? `${el.subject}`
                                : `${el.subject}, `
                            )}
                        </b>
                      </div>
                    ))}
                  </ReactCarousel>
                </Carousel>
              </div>
            </div>
          </div>
        ) : (
            <div className="a-nodata-Content">No Data Available</div>
          )}

        <div className="a-about-location">
          <div className="a-container">
            <div className="a-about-inner-wrapper">
              <h4>Coaching Details</h4>
              <div className="a-about-loc-details">
                <div className="a-about-half-details">
                  <span>
                    <TestSeries />
                  </span>
                  <div className="a-about-desc-cover">
                    <p>Exam Covered</p>
                    <h5>
                      {detailsAbout.examTypes.map((el, i) =>
                        detailsAbout.examTypes.length - 1 === i ? (
                          <React.Fragment key={i}>
                            {el.examType}{' '}
                          </React.Fragment>
                        ) : (
                            <React.Fragment key={i}>
                              {el.examType},{' '}
                            </React.Fragment>
                          )
                      )}
                    </h5>
                  </div>
                </div>
                <div className="a-about-half-details">
                  <span>
                    <Location />
                  </span>
                  <div className="a-about-desc-cover">
                    <p>Address</p>
                    <h5>
                      {detailsAbout.city.city}, {detailsAbout.state.name}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AboutRelated dataCarousel={detailsAbout.relatedCoachings} />
      </div>
      {reportModal && (
        <Modal addClass="report-modal modal-sm">
          <div className="modal-header">
            <h2>Report Coaching</h2>
            <span className="close" onClick={closeModal}>
              <ModalClose />
            </span>
          </div>
          <div className="modal-body">
            <h5 className="report-label">Choose Report Type:</h5>
            <ul className="roprt-list">
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="sexual-content" />
                  <label htmlFor="sexual-content">Sexual content</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="Violent" />
                  <label htmlFor="Violent">Violent or repulsive content</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="Hateful" />
                  <label htmlFor="Hateful">Hateful or abusive content</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="harmful" />
                  <label htmlFor="harmful">Harmful dangerous content</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="spam" />
                  <label htmlFor="spam">Spam or misleading</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="infringes" />
                  <label htmlFor="infringes">Infringes my rights</label>
                </p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write your reason..."
                />
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="captions" />
                  <label htmlFor="captions">Captions issue</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="others" />
                  <label htmlFor="others">Others</label>
                </p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Leaving reason..."
                />
              </li>
            </ul>
            <p className="notes">
              Flagged coachings are reviewed by ADMISURE staff 24 hours a day,
              seven days a week to determine whether they violate Community
              Guidelines. Accounts are penalized for Community Guidelines
              violations, and serious or repeated violations can lead to account
              termination.
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn-white" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn-grey" onClick={submitModal}>Submit</button>
          </div>
        </Modal>
      )}
    </>
  );
}
