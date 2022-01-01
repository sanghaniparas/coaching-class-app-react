import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const PortalBody = ({ testInstructions }) => {
  return (
    <div className="temp-container temp-inst" style={{ height: '100vh', marginTop: '-61px'}}>
      <div className="portal-body">
        <h2 className="temp-instruction">
          Portal Instruction
          {/* <div className="choose-lang">
            <p>Choose Your default Language</p>
            <select name="" id="">
              <option value="">English</option>
            </select>
          </div> */}
        </h2>
        <div className="bodycontainer">
          {testInstructions && ReactHtmlParser(testInstructions?.portalInstruction?.portalContent)}
        </div>
      </div>

      <div className="portal-sidebar">
        <div className="avatar-info">
          <span className="avatar-img">
            <img
              src={require('../../../../assets/images/no-image-icon-md.png')}
              alt=""
            />
          </span>
          <h3>John Smith</h3>
        </div>
      </div>
    </div>
  );
};

export default PortalBody;
