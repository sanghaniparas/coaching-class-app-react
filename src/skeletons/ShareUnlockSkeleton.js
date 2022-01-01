import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ShareUnlockSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <Skeleton height={250} width={`100%`} />
    </SkeletonTheme>
  );
};

export default ShareUnlockSkeleton;
