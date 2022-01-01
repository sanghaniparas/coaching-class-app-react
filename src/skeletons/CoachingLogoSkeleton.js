import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CoachingLogoSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <Skeleton circle={true} height={120} width={120} />
    </SkeletonTheme>
  );
};

export default CoachingLogoSkeleton;
