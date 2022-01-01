import React from 'react';
import BannerSkeleton from '../../../skeletons/BannerSkeleton';
import { CheckCircle } from '../../Core/Layout/Icon';

const TestSeriesFeatures = ({ features }) => {
  return (
    <div>
      {Array.isArray(features) === false ? (
        <div style={{ marginTop: '2rem' }}>
          <BannerSkeleton />
        </div>
      ) : features.length > 0 ? (
        <div className="features-wrapper">
          <h2>Features</h2>
          <div className="card">
            <h3>Why Take This Package</h3>
            <ul>
              {features &&
                features.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle /> {item.packageFeatures}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ):null}
    </div>
  );
};

export default TestSeriesFeatures;
