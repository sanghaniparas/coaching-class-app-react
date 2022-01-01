import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import Accordion from "../Elements/Accordion";
import JsonLd from "./../../../utils/JsonLd";
import FaqSkeleton from "./../../../skeletons/FaqSkeleton";

export default function Faq({ faqCoaching, addCoachingClass, faqs }) {
  const [data, setData] = useState("");

  useEffect(() => {
    if (faqs) {
      let value = faqs.map((faq) => {
        return {
          "@type": "Question",
          name: faq.faqTitle,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.faqContent,
          },
        };
      });
      setData(
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: value,
        })
      );
    } else {
      if (faqCoaching) {
        let value = faqCoaching.coachingPageFaq.map((faq) => {
          return {
            "@type": "Question",
            name: faq.faqTitle,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.faqContent,
            },
          };
        });
        setData(
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: value,
          })
        );
      }
    }
  }, [faqCoaching, faqs]);

  return (
    <>
      {(faqs &&  faqs?.length > 0 || faqCoaching) && <div className={`a-accordian ${addCoachingClass}`}>
        <div className="a-container">
          <div className="a-wrapper">
            <h4>FAQs</h4>
            <div className="a-faqwrap">
              {(faqs && faqCoaching) === null ? (
                <FaqSkeleton />
              ) : faqs ? (
                faqs.map((item, idx) => (
                  <Accordion key={idx} title={item.faqTitle}>
                    {ReactHtmlParser(item.faqContent)}
                  </Accordion>
                ))
              ) : (
                faqCoaching.coachingPageFaq.map((item, idx) => (
                  <Accordion key={idx} title={item.faqTitle}>
                    {ReactHtmlParser(item.faqContent)}
                  </Accordion>
                ))
                
              )}
            </div>
          </div>
        </div>
      </div>}
      <JsonLd data={data} />
    </>
  );
}
