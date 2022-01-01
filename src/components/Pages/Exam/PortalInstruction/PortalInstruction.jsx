import React, { Fragment, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import PortalHeader from './PortalHeader';
import PortalBody from './PortalBody';
import PortalFooter from './PortalFooter';
import { getInstructions } from './../../../../redux/actions/exam';
import SscInstruction from './SscInstruction';

const PortalInstruction = ({
  getInstructions,
  testInstructions,
  loading,
  match,
}) => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    console.log(location.state)
    if (location.state) {
      getInstructions(location.state.id);
    } else {
      history.push(`/nomatch`);
    }
  }, []);

  return (
    <>
      {
      localStorage.getItem('token') ?
      
      loading || Object.keys(testInstructions).length === 0 ? (
        <div style={{ minHeight: '100vh' }}>
          <Loader
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            type="Oval"
            color="#FF7249"
            height={40}
            width={40}
          
          />
        </div>
      ) : (
        <Fragment>
          <div
            className={`portal-wrap  ${
              testInstructions.testInfo.template.toLowerCase() !== 'default' &&
              ['rrb', 'cat', 'gate'].includes(
                testInstructions.testInfo.template.toLowerCase()
              )
                ? 'template-railway'
                : `template-${testInstructions.testInfo.template.toLowerCase()}`
            }`}>
            <PortalHeader testInstructions={testInstructions} />
            <PortalBody testInstructions={testInstructions} />
            <PortalFooter id={location.state.id} />
          </div>
          )
        </Fragment>
      ):
      history.push('/')}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInstructions: (testId) => dispatch(getInstructions(testId)),
  };
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    loading: state.exam.loading,
    testInstructions: state.exam.testInstructions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortalInstruction);
