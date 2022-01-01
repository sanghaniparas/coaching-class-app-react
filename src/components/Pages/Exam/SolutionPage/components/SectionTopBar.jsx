import React, { Fragment, useState, useEffect } from 'react';
import { changeLanguage } from '../../../../../redux/actions/exam';
import { connect } from 'react-redux';

const SectionTopBar = ({
  solutionData,
  activeTab,
  changeLanguage,
  toggleSectionTabs,
}) => {
  const [langId, setLangId] = useState(0);
  useEffect(() => {
    setLangId(parseInt(localStorage.langId));
  }, []);

  return (
    <div className="section-top-bar">
      <div className="left-panel">
        {solutionData && solutionData?.testConfig?.testPatternType !== 3 && (
          <><h4>Sections:</h4>
            {Object.keys(solutionData).length &&
              solutionData.sections.map((el, i) => (
                <Fragment key={i}>
                  <button
                    onClick={() => {
                      toggleSectionTabs(i);
                    }}
                    className={
                      activeTab === i ? 'btn btn-default active' : 'btn btn-default'
                    }>
                    {el.sectionName}
                  </button>
                </Fragment>

              ))}
          </>
        )}

      </div>
      <div className="right-panel">
        <p>Language</p>
        <select
          value={langId}
          onChange={(e) => {
            setLangId(parseInt(e.target.value));
            localStorage.setItem('langId', parseInt(e.target.value));
            changeLanguage(parseInt(e.target.value));
          }}
          className="form-control input-sm">
          {solutionData && Object.keys(solutionData).length &&
            solutionData?.languages.map((el, i) => (
              <option value={el.id}>{el.languageName}</option>
            ))}
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    solutionData: state.solution.solutionData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (langId) => dispatch(changeLanguage(langId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionTopBar);
