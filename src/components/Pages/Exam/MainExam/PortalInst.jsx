import React, { useEffect, useState } from 'react';
import { togglePortalInstruction } from './../../../../redux/actions/exam';
import { Modal } from '../../../Core/Layout/Modal/Modal';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { ModalClose } from '../../../Core/Layout/Icon';

const PortalInst = ({ togglePortalInstruction, testInstructions, testInstOnPopup, sectionNumber }) => {
  const [inst, setInst] = useState('');
  useEffect(() => {
    console.log("testInstructions ***", testInstructions);
    if(testInstructions && testInstructions.sections[sectionNumber].testInstruction && testInstructions.sections[sectionNumber].testInstruction.testContent){
      setInst(ReactHtmlParser(testInstructions.sections[sectionNumber].testInstruction.testContent))
    }
   

  }, [testInstructions, sectionNumber])
  const content = () => (
    <div className="temp-container">
      <h2 className="temp-instruction"><span>Portal</span> Instruction </h2>
      {ReactHtmlParser(testInstructions.portalInstruction.portalContent)}

      <h2 className="temp-instruction"><span>Test</span> Instruction </h2>
      {inst}
      <div className="solution-footer">
        <button
          className="btn-grey"
          style={{ margin: '0 auto', backgroundColor: '#ddd' }}
          onClick={() => togglePortalInstruction(false)}>
          Back
        </button>
      </div>
    </div>
  );

  const contentModal = () => (
    <div className="temp-container">
      <h2 className="temp-instruction"><span>Portal</span> Instruction</h2>
      {ReactHtmlParser(testInstructions.portalInstruction.portalContent)}
    </div>
  );

  console.log('testInstOnPopup', testInstOnPopup);

  return (
    <>
      {testInstOnPopup && <Modal>
        <span className="close" onClick={() => togglePortalInstruction(false)}><ModalClose /></span>
        {contentModal()}
      </Modal>}
      {!testInstOnPopup && content()}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    testInstructions: state.exam.testInstructions,
    sectionNumber: state.exam.sectionNumber
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePortalInstruction: (show) => dispatch(togglePortalInstruction(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortalInst);
