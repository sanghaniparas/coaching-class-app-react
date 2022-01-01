import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const SideHeader = ({ stateCount, profileUrl }) => {
  const [profileImage, setProfileImage] = useState(null)
  useEffect(() => {


    console.log("profileUrl", profileUrl.mainProfile ? profileUrl.mainProfile.avatarUrl : "nope");
    if (profileUrl.mainProfile) {
      setProfileImage(profileUrl.mainProfile.avatarUrl)
      console.log("profileImage", profileImage);
    }
  })
  // console.log("profileUrl", profileUrl);

  return (
    <>
      <div className="side-header">
        <div className="profile-info">
          {profileImage? <span className="avatar" style={
            {
              width: "40px",
              height: "40px",
              backgroundImage: `url('${profileImage && profileImage}')`,
              backgroundPosition: 'center center',
              backgroundSize: "cover",
              borderRadius: "20px",
              marginTop: "-5px"

            }
          }>  </span>:(
            <>
             <img
              style={{  width: "40px",
              height: "40px",  
              backgroundPosition: 'center center',
              backgroundSize: "cover",
              borderRadius: "20px",
              marginTop: "-5px" }}
              src={require('../../../../assets/images/no-image-icon-md.png')}

              alt=""
            />
            </>

          )}
          
            
         
          {/* SSC template start */}
          <span className="ssc-avatar">
            <img
              src={require('../../../../assets/images/sscdefault-avatar.jpg')}
              //src={`url('${profileImage}')`}
              alt=""
            />
          </span>
          {/* Railway template */}
          <div className="railway-info">
            <h4>{localStorage.username}</h4>
            <p className="profile-link">Profile</p>
          </div>
          <div className="ssc-info">
            {/* <h3>Roll No.</h3>
            <p>SW1010</p> */}
            <h3>Candidate Name</h3>
            <p>{localStorage.username}</p>
          </div>

          {/* SSC template end */}
          <h4>{localStorage.username}</h4>
        </div>
      </div>
      <div className="answer-group">
        <ul>
          <li>
            <span className="ovl green">{stateCount.answered}</span> Answered
          </li>
          <li>
            <span className="rounded">
              {stateCount.markedAnswered} <i className="fa fa-check"></i>{' '}
            </span>{' '}
            Marked &amp; Answered
          </li>
          <li>
            <span className="rounded">{stateCount.marked}</span> Marked
          </li>
          <li>
            <span className="ovl-rev red">{stateCount.notAnswered}</span> Not
            Answered
          </li>
          <li>
            <span className="radius red">{stateCount.notVisited}</span> Not
            Visited
          </li>
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    stateCount: state.exam.stateCount,
    profileUrl: state.profileData,
  };
};

export default connect(mapStateToProps)(SideHeader);
