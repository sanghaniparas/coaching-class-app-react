import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const BannerSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <Skeleton height={280} width={`100%`} />
    </SkeletonTheme>
  );
};

export default BannerSkeleton;
