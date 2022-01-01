import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ExploreWideRangeSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <Skeleton width={`50%`} height={30} />
      <div style={{ marginTop: '20px' }}>
        <Skeleton count={3} height={40} />
      </div>
    </SkeletonTheme>
  );
};

export default ExploreWideRangeSkeleton;
