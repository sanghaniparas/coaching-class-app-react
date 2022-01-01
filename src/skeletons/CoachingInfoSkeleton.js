import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CoachingInfoSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <div style={{ width: '800px' }}>
        <div>
          <p>
            <Skeleton width={`50%`} />
          </p>
          <p>
            <Skeleton width={`30%`} />
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default CoachingInfoSkeleton;
