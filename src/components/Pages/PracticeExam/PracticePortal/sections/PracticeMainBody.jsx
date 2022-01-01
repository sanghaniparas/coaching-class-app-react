import React, { useState, useEffect } from 'react'
import PracticeChapterQuestion from './PracticeChapterQuestion';
import PracticeReport from './PracticeReport';

const PracticeMainBody = ({
  toggleReport,
  handleSetToggleReport,
  count,
  setCount,
  resetCount,
  pResultId,
  practiceSidebarToggle,
  practicesidebar,
  newPercentage,
  slideCount,
  setslideCount,
  practiceChapters

}) => {
  const [filterNumber, setFilterNumber] = useState(null);
  const handleFilterNumber =(num)=>{
    setFilterNumber(num)
  }

  useEffect(() => {
    return () => {
      localStorage.removeItem('countP');
      localStorage.removeItem('actChapterindex');
      localStorage.removeItem('actChapterid');


    };
  }, [])
  return (
    <div className="practice-main-container">
      {toggleReport === false ? (
        <PracticeChapterQuestion
          practiceChapters={practiceChapters}
          handleSetToggleReport={handleSetToggleReport}
          count={count}
          setCount={setCount}
          resetCount={resetCount}
          pResultId={pResultId}
          practiceSidebarToggle={practiceSidebarToggle}
          practicesidebar={practicesidebar}
          filterNumber={filterNumber}
          newPercentage={newPercentage}
          slideCount={slideCount}
          setslideCount={setslideCount}
        />
      ) : (
          <PracticeReport
            handleSetToggleReport={handleSetToggleReport}
            pResultId={pResultId}
            handleFilterNumber={handleFilterNumber} />
        )}
    </div>
  );
};

export default PracticeMainBody;
