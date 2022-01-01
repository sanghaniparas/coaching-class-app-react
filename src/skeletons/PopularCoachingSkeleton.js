import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const PopularCoachingSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <Skeleton width={`60%`} height={30} />
    </SkeletonTheme>
  );
};

export default PopularCoachingSkeleton;
