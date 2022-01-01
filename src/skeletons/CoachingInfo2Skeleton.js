import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CoachingInfo2Skeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <div style={{ width: '800px' }}>
        <Skeleton width={`70%`} height={50} />
      </div>
    </SkeletonTheme>
  );
};

export default CoachingInfo2Skeleton;
