import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TestDetailsLogoSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <Skeleton width={`100%`} height={200} />
    </SkeletonTheme>
  );
};

export default TestDetailsLogoSkeleton;
