import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectTestPackageSections } from './../../../../redux/homepage/homepage.selectors';
import TestPackageOverview from '../components/TestPackageOverview';
import JsonLd from './../../../../utils/JsonLd';

const TestPackages = ({ testPackageSections }) => {
  let testPackageList = [];
  if(testPackageSections !== undefined) {
    testPackageSections.map((el, i) => {
      if(el.home_page_test_package_lists.length) {
        testPackageList.push(el);
      }
    })
  }
  return (
    testPackageSections !== undefined &&
    testPackageList.map((el, i) => {
      if(el.home_page_test_package_lists.length) {
        console.log(el.home_page_test_package_lists)
        let data = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: el.home_page_test_package_lists.map((item, idx) => {
            return {
              '@type': 'ListItem',
              position: idx + 1,
              url: `${window.location.origin}/testdetails/${item.id}`,
            };
          }),
        };
        return (
          <>
            <TestPackageOverview el={el} idx={i} key={i}/> 
            <JsonLd data={JSON.stringify(data)} />
          </>
        );
      }
      
    })
  );
};

const mapStateToProps = createStructuredSelector({
  testPackageSections: selectTestPackageSections,
});

export default connect(mapStateToProps)(TestPackages);
