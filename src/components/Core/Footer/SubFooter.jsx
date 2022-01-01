import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectSubFooter } from './../../../redux/homepage/homepage.selectors';

const SubFooter = ({ subFooters }) => {
  return subFooters !== undefined ? (
    <div className="subfooter">
      <div className="a-container">
        {subFooters.map((el,idx) => (
          <div className="subfooter-content" key={idx}>
            <h4>{el.catName}</h4>
            <ul>
              {el.home_page_sub_footer_sub_categories.map((x,i) => (
                <li key={i}>
                  <a
                    rel="noopener noreferrer"
                    href={x.targetUrl}
                    target="_blank">
                    {x.subCatName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  ) : (
    ''
  );
};

const mapStateToProps = createStructuredSelector({
  subFooters: selectSubFooter,
});

export default connect(mapStateToProps)(SubFooter);
