import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function TestExamTab({ data }) {
  const [sideTab, setSideTab] = useState(null);
  const [tabDesc, setTabDesc] = useState(null);

  useEffect(() => {
  if(data.examPageInfoCategory && data.examPageInfoCategory.length > 0){
  
    setSideTab(data.examPageInfoCategory[0].id);
  }


  }, [data]);

  useEffect(() => {
    if (sideTab) {
      let obj = data.examPageInfoCategory.find(
        (el) => el.id === Number(sideTab)
      );

      setTabDesc(
        ReactHtmlParser(obj.examPageInfoInformation[0].informationText)
      );
    }
  }, [data, sideTab]);

  return (
    <div className="a-examInfo-wrapper">
      <div className="a-info-tab-wrapper card">
        <div className="a-tab-sidebar">
          <ul>
            {data.examPageInfoCategory.map((el) => (
              <li onClick={() => setSideTab(el.id)}>
                <span className={Number(sideTab) === el.id && 'a-selected'}>
                  {el.categoryName}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="a-tab-container">
          <h3 className="tab-title">
            {sideTab &&
              data.examPageInfoCategory.find((el) => el.id === Number(sideTab))
                .categoryName}
          </h3>
          <div className="desc-wrapper">
            <input type="checkbox" name="" id="readContent" />
            <div className="desc test-desc">
              <p>{tabDesc}</p>
            </div>
            <label htmlFor="readContent" className="btnToggle">
              <img
                src={require('../../../assets/images/right-double-arrow.svg')}
                alt=""
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
