import React, {useState, useEffect} from 'react';
import SearchCoaching from './SearchCoaching';
import SearchCoachingDetails from './SearchCoachingDetails';
import SearchPractice from './SearchPractice';
import SearchQuiz from './SearchQuiz';
import SearchTestSeries from './SearchTestSeries';
import SearchSubMenu from './SearchSubMenu';
import {SerachType, SEARCHCHOICE} from '../Global/Constant';
import { useLocation } from 'react-router-dom';

export default function SearchMain({
  searchCoachingData,
  searchQuizData,
  searchPracticeData,
  searchTestPackageData,
  reset,
  setReset
}) {
  const [isSubTab, setIsSubTab] = useState(SerachType?.[0].label);
  const [isExamType, setExamType] = useState(false);
  const handleSelectedSection = (item) => {
    setIsSubTab(item.label);
   
  };
  const location = useLocation();
  useEffect(() => {
    if(reset){
      setIsSubTab('All');
      setReset();
    }
    // reset && setIsSubTab('All');
    // reset && setReset
    if(location.state?.examType){
      setExamType(true);
    }else{
      setExamType(false);
    }
  }, [reset]);
  useEffect(() => {
    console.log('location', location);
  }, []);
  return (
    <div className="search-main-container">
      {isExamType && <div className="searchcoaching-header">
        <div className="top">
          <div className="info-box">
            <h2>{location.state?.searchKeywords}</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero deserunt, harum ducimus ut perspiciatis porro voluptas commodi dicta dignissimos aspernatur exercitationem, quo consequatur cumque facilis tempora. Alias earum maxime aperiam.</p>
          </div>
          {/* <button className="btn-primary">Follow</button> */}
        </div>
        <div className="bottom">
        <SearchSubMenu isSubTab={isSubTab} handleSelectedSection={handleSelectedSection}/>
        </div>
      </div> }
      {isSubTab && !isExamType &&
        <SearchSubMenu isSubTab={isSubTab} handleSelectedSection={handleSelectedSection}
      />
      }
     
      {(isSubTab === SEARCHCHOICE.COACHING ||  isSubTab === SEARCHCHOICE.ALL)  &&
        <SearchCoaching 
        searchCoachingData={searchCoachingData}  
        setViewSection={handleSelectedSection}
        isSubTab={isSubTab}
        />
      }

      {(isSubTab === SEARCHCHOICE.PACKAGE ||  isSubTab === SEARCHCHOICE.ALL) &&
        <SearchTestSeries 
        searchTestPackageData={searchTestPackageData} 
        setViewSection={handleSelectedSection}
        isSubTab={isSubTab}
        />
      }
      {(isSubTab === SEARCHCHOICE.PRACTICE ||  isSubTab === SEARCHCHOICE.ALL) &&
        <SearchPractice 
        searchPracticeData={searchPracticeData} 
        setViewSection={handleSelectedSection}
        isSubTab={isSubTab}
        />
      }
      {(isSubTab === SEARCHCHOICE.QUIZ ||  isSubTab === SEARCHCHOICE.ALL) &&
        <SearchQuiz 
        searchQuizData={searchQuizData} 
        setViewSection={handleSelectedSection}
        isSubTab={isSubTab}
        />
      }
      {/* {(isSubTab === SEARCHCHOICE.COACHING ||  isSubTab === SEARCHCHOICE.ALL) && <SearchCoachingDetails 
        searchCoachingData={searchCoachingData} 
        isSubTab={isSubTab}
        setViewSection={handleSelectedSection}
      />} */}
    </div>
  )
}
