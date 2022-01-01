import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Accordion from '../Elements/Accordion';

export default function TestSeriesFaq({ faqCoaching }) {
  console.log(faqCoaching);
  return (
    <div>
        { faqCoaching &&  
        <div className="a-accordian">   
                <div className="a-container">
                    <div className="a-wrapper">
                        <h4>FAQs</h4>
                        <div className="a-faqwrap">
                            {faqCoaching &&
                            faqCoaching.map((item, idx) => (
                                <Accordion key={idx} title={item.detailsName}>
                                {ReactHtmlParser(item.detailsText)}
                                </Accordion>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  );
}
