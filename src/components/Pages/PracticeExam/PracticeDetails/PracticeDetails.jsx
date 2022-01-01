import React, { useState, useEffect } from 'react';
import Layout from '../../../Core/Layout/Layout';
import { NavLink } from 'react-router-dom';
import usePracticeSchema from './../../../../Hooks/usePracticeSchema';
import {
  Location,
} from '../../../Core/Layout/Icon';

import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';

import PracticeHeader from './sections/PracticeHeader';
import PracticeSetDetails from './sections/PracticeSetDetails';
import PracticeCurrent from './sections/PracticeCurrent';
import PracticeRecent from './sections/PracticeRecents';
import PracticeSubjects from './sections/PracticeSubjects';
import JsonLd from './../../../../utils/JsonLd';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../../../../config';
import ReactMeta from '../../../../utils/ReactMeta';
import ProductReviewModal from './../../TestSeriesDetails/ProductReviewModal';
import { Modal } from '../../../Core/Layout/Modal/Modal';
import { useToasts } from 'react-toast-notifications';
import{useDispatch} from 'react-redux';
import { getProgressStats } from '../../../../redux/practice/practice.actions';

export default function PracticeDetails(props) {
  const [practiceDetails, setPracticeDetails] = useState(0);
  const [practiceIdDeepak, setpracticeIdDeepak] = useState(null);
  const [allPracticeSet, setAllPracticeSet] = useState(0);
  const [allSubject, setAllSubject] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [isSelectedTab, setIsSelectedTab] = useState('current');
  const [isTrue, setIsTrue] = useState(true);
  const [modalToggle, setmodalToggle] = useState(false);
  const [percent, setPercent] = useState(0);

  const [selectedValue, setSelectedValue] = useState({ ...props.onChange });
  const dispatch = useDispatch();

  // Custom hook
  const data = usePracticeSchema(props.match.params.id);
  const { addToast } = useToasts();
  const history = useHistory();
  useEffect(() => {
    async function fetchPracticeDetails() {

      console.log("localStorage.token",localStorage.token);
      const config = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `${localStorage.token}`,
        },
      };
      try {
        const response = await axios.get(
          `${BASE_URL}/practiceSet/details/${props.match.params.id}`,config
        );

        console.log("details ***", response.data.data);
        // setFaculties(response.data.data.practiceSetFaculties);
        setFaculties(response.data.data.practiceExamCoachingList);
        setPracticeDetails(response.data.data.details);
        setPercent(response.data.data.reviewPercentage);
        setAllPracticeSet(response.data.data.allPracticeSet);
        setAllSubject(response.data.data.allSubject);
        setIsTrue(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPracticeDetails();
  }, []);

  const onChange = (id) => {
    let path = `/practice-details/${id}`;
    history.push(path);
    setpracticeIdDeepak(id)

    fetchPractice(id);
  };



  async function fetchPractice(id) {
    try {
      const config = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `${localStorage.token}`,
        },
      };
      const response = await axios.get(`${BASE_URL}/practiceSet/details/${id}`,
      config);

      console.log("res44",response);

      setPracticeDetails(response.data.data.details);
      setAllPracticeSet(response.data.data.allPracticeSet);
      setAllSubject(response.data.data.allSubject);
      setIsTrue(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleTab = (status) => {
    setIsSelectedTab(status);
  };

  const ratingModalHandler = () => {
    if(practiceDetails.logedInUserRating > 0)
    {
      return  addToast('You have already rated this practice set', {
        appearance: 'error',
        autoDismiss: 'true',
        autoDismissTimeout: 3000,
      });

    }
   
    setmodalToggle(!modalToggle);
  };

  const modalCloseHandler = () => {
    setmodalToggle(false);
  };

  const goToCoaching = (id) => {
    history.push(`/coaching/${id}`)
  }
  

  return (
    <Layout>
      <div className="a-wrapper practiceDetails">
        <PracticeHeader practiceDetails={practiceDetails} />
        <div className="test_details mobile_view">
              <span class="a-card-avatar"><img width="56" height="56" src={practiceDetails?.coaching?.logoUrl}/></span>
              <div className="coaching_blk">
                <h3 class="a-card-title"> {practiceDetails?.coaching?.coachingName}</h3>               

                <p class="a-card-location">
                  <Location /> {practiceDetails?.coaching?.city?.city},{' '}
                {practiceDetails?.coaching?.state.name},
                {practiceDetails?.coaching?.country.name}
                </p> 
              </div>                            
          </div>
        <div className="banner-bottom-tab">
          
          <ul className="tab-items">
            <li
              className={isSelectedTab === 'current' ? 'activeTab' : ''}
              onClick={() => handleTab('current')}>
              Progress Status
            </li>

        {localStorage.getItem('token') && 
            <li
              className={isSelectedTab === 'recent' ? 'activeTab' : ''}
              onClick={() => handleTab('recent')}>
              Recent Chapter
            </li>
          }

            <li
              className={isSelectedTab === 'subjects' ? 'activeTab' : ''}
              onClick={() => handleTab('subjects')}>
              Subjects
            </li>
          </ul>
          <ul className="avatar-lists">
            {faculties.length > 0 &&
              faculties.slice(0, 5).map((el) => (
                <li key={el?.id} onClick={() => goToCoaching(el?.id)} style={{cursor:'pointer'}}>
                  <span  >
                    {
                      el.coachingLogoUrl?<img src={el.coachingLogoUrl} alt="profile pic" />:<img src={`https://via.placeholder.com/40x40?text=${el.coachingName}`} alt="profile pic" />
                    }
                    {/* <img src={el} alt="" /> */}
                  </span>
                </li>
              ))}
          </ul>
          <div className="mobile_select mobile_view">
            <label for="" class="a-card-select">Select your Practice Sets</label>
            {Object.keys(allPracticeSet).length === 0 ? null : (
              <select
                name=""
                id=""
                defaultValue={props.match.params.id}
                value={allPracticeSet.find(
                  (obj) => obj.value === selectedValue
                )}
                onChange={(e) => {props.onChange(e.target.value)
                  dispatch(getProgressStats(e.target.value));
                }}>
                {allPracticeSet.map((el, idx) => (
                  <option key={idx} value={el.id}>
                    {el.setName}
                  </option>
                ))}
              </select>
                 )}
          </div>
        </div>

        <div className="practice-wrapper">
          {localStorage.getItem('token') && 
          <button className="practicerate-btn" onClick={ratingModalHandler}>
            Rate this Practice Sets
          </button> }
          <div className="a-container">
            <PracticeSetDetails
              onChange={onChange}
              allPracticeSet={allPracticeSet}
              practiceDetails={practiceDetails}
            />

            <div className="right-container">
              {isSelectedTab === 'current' && (
                <React.Fragment>
                  <PracticeCurrent practiceDetails={practiceDetails} /> 
                  <PracticeRecent practiceDetails={practiceDetails} practiceIdDeepak={practiceIdDeepak} />  
                  <PracticeSubjects allSubject={allSubject} practiceDetails={practiceDetails}/>
                </React.Fragment>
              
                
              )}
              {isSelectedTab === 'recent' && (
                <PracticeRecent practiceDetails={practiceDetails} practiceIdDeepak={practiceIdDeepak}/>
              )}
              {isSelectedTab === 'subjects' && (
                <PracticeSubjects allSubject={allSubject} practiceDetails={practiceDetails}/>
              )}
            </div>
          </div>
        </div>
      </div>
      <JsonLd data={JSON.stringify(data)} />
      {practiceDetails!==null ? <ReactMeta data={practiceDetails.seoDesc} />:""}

      {modalToggle && (
        <Modal addClass="package-rating">
          <ProductReviewModal
            percent={percent}
            modalClose={modalCloseHandler}
            practicePage={true}
            practiceDetails={practiceDetails}
          />
        </Modal>
      )}
    </Layout>
  );
}
