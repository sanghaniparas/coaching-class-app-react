import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const WideRange = () => {
  return (
    <SkeletonTheme color="#ddd">
      <Skeleton width={`60%`} height={50} />
      <div style={{ marginTop: '30px' }}>
        {[1, 2, 3, 4, 5, 6].map((el,i) => (
          <div style={{ marginBottom: '10px' }} key={i}>
            <Skeleton width={120} height={30} />
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default WideRange;
