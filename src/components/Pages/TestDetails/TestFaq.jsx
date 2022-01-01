import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Accordion from './../Elements/Accordion';

export default function TestFaq({ data }) {
  console.log(data.examPageFaqList)
  return (
    <div className={`a-accordian`}>
      <div className="a-container">
        <div className="a-wrapper">
          <h4>FAQs</h4>
          {data &&
              data.examPageFaqList.length > 0 ? <div className="a-faqwrap">
            {data &&
              data.examPageFaqList.map((item, idx) => (
               <Accordion key={idx} title={item.faqTitle}>
                  {ReactHtmlParser(item.faqContent)}
                </Accordion>
              ))}
          </div> :
          <div className="a-nodata-Content">No data found</div>}
        </div>
      </div>
    </div>
  );
}
