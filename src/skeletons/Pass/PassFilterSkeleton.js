import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const PassFilterSkeleton = () => {
  return (
    <div style={{ width: '1100px', margin: 'auto', marginTop: '2rem' }}>
      <SkeletonTheme color="#ddd">
        <div>
          <Skeleton width={800} height={40} />
        </div>
        <div>
          <Skeleton width={600} height={40} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default PassFilterSkeleton;
