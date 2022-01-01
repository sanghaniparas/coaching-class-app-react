import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ExamTypeList from './ExamTypeList';
import {
  selectHomeExamAllTab,
  selectHomeExamSectionsTab,
} from './../../../../redux/homepage/homepage.selectors';
import ExploreWideRangeSkeleton from './../../../../skeletons/ExploreWideRangeSkeleton';

const ExamTypeTabs = ({ allTabData, sectionTabsData }) => {
  const [tabNo, setTabNo] = useState(-1);
  const [data, setData] = useState([]);

  // when component first mounts, set All value, if TabNo changes again change data
  useEffect(() => {
    if (allTabData !== undefined && sectionTabsData !== undefined) {
      if (tabNo === -1) setData([...allTabData]);
      else {
        let whichTabData = sectionTabsData[tabNo].home_page_exam_lists;
        setData([...whichTabData]);
      }
    }
  }, [tabNo, allTabData]);

  return (
    <>
      {sectionTabsData === undefined ? (
        <ExploreWideRangeSkeleton />
      ) : (
          <>
            <ul style={{ cursor: 'pointer' }} className="explore-tab">
              <li
                className={tabNo === -1 && 'active'}
                onClick={() => setTabNo(-1)}>
                <a>All</a>
              </li>
              {sectionTabsData !== undefined &&
                sectionTabsData.map((el, i) => (
                  <li key={i}
                    className={tabNo === i && 'active'}
                    onClick={() => setTabNo(i)}>
                    <a>{el.sectionName}</a>
                  </li>
                ))}
            </ul>
            <ExamTypeList data={data} />
          </>
        )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  allTabData: selectHomeExamAllTab,
  sectionTabsData: selectHomeExamSectionsTab,
});

export default connect(mapStateToProps)(ExamTypeTabs);
