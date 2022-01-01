import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { DoubleArrowRight } from '../../Core/Layout/Icon';
import BannerSkeleton from './../../../skeletons/BannerSkeleton';

const TestSeriesInfo = ({ testDetails }) => {
  const [examType, setExamType] = useState('');
  const [category, setCategory] = useState(0);
  const [isActive, setIsActive] = useState(0);
  const [examDetailText, setExamDetailText] = useState('');
  const [info, setInfo] = useState('');

  const examTypeChange = (e) => {
    e.preventDefault();
    setExamType(e.target.value);
    setExamDetailText(e);
    const index = testDetails.examInfos.findIndex(
      (el) =>
        e.target.value === `${el.examName.examName} ${el.examType.examType}`
    );
    setCategory(index);
  };

  const onChangeInfo = (idx, el) => {
    setIsActive(idx);
    setInfo(el.categoryName);
    setExamDetailText(el.examDetail);
  };

  useEffect(() => {
    setExamType(
      Object.keys(testDetails).length === 0
        ? ''
        : `${testDetails.examInfos[0].examName.examName} ${testDetails.examInfos[0].examType.examType}`
    );
  }, []);

  useEffect(() => {
    setIsActive(0);
    setExamDetailText(
      Object.keys(testDetails).length === 0
        ? ''
        : testDetails.examInfos.length === 0
        ? null
        : testDetails.examInfos[category]?.categories?.[0]?.examDetail
    );

    setInfo(
      Object.keys(testDetails).length !== 0 &&
        testDetails.examInfos.length &&
        testDetails.examInfos[category].categories.length !== 0 &&
        `${testDetails.examInfos[category]?.categories?.[0]?.categoryName}`
    );
  }, [examType, testDetails]);

  const removeHTML = (str) => { 
      var tmp = document.createElement("DIV");
      tmp.innerHTML = str;
      return tmp.textContent || tmp.innerText || "";
  }

  return (
    <>
      {Object.keys(testDetails).length === 0 ? (
        <BannerSkeleton />
      ) : testDetails.examInfos.length === 0 ? null : (
        <div className="a-examInfo-wrapper">
          <h2>Exam Information</h2>
          <div className="a-info-tab-wrapper card">
            <div className="a-tab-sidebar">
              <select
                name=""
                id=""
                value={examType}
                onChange={(e) => examTypeChange(e)}>
                {Object.keys(testDetails).length === 0
                  ?  <div className="a-nodata-Content">No data found</div>
                  : testDetails.examInfos.map((el, idx) => (
                      <React.Fragment key={idx}>
                        <option
                          value={`${el.examName.examName} ${el.examType.examType}`}>
                          {el.examName.examName}
                        </option>
                      </React.Fragment>
                    ))}
              </select>

              {Object.keys(testDetails).length &&
              testDetails.examInfos.length === 0 ? null : (
                <ul>
                  {testDetails.examInfos[category].categories.map((el, idx) => {
                    return (
                      <li>
                        <span
                          onClick={() => {
                            onChangeInfo(idx, el);
                          }}
                          key={idx}
                          to=""
                          className={isActive === idx ? 'a-selected' : ''}>
                          {el.categoryName}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="a-tab-container">
              {info.length ? (
                <h3 className="tab-title">{info}</h3>
              ) : (
                <strong>No information available!</strong>
              )}
              <div className="desc-wrapper">
                <input type="checkbox" name="" id="readContent" />
                <div className="desc test-desc">
                  {examDetailText
                    ? ReactHtmlParser(examDetailText.details)
                    : ''}
                </div>
                {info.length && removeHTML(examDetailText.details).length > 1500 && (
                  <label htmlFor="readContent" className="btnToggle">
                    <img
                      src={require('../../../assets/images/right-double-arrow.svg')}
                      alt=""
                    />
                  </label>
                )}
              </div>
              {/* <p className="download" style={{ fontWeight: 'bold' }}>
                Download Your Admint Card for SBI PO Mains Exam-{' '}
                <Link to="/">Click Here</Link>
              </p>

              <ul className="list">
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>Lorem, ipsum dolor sit amet </li>
                <li>Lorem, ipsum dolor </li>
                <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
              </ul> */}
              {/* <p className="read-more">
                <Link to="">
                  Read More <DoubleArrowRight />
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestSeriesInfo;
