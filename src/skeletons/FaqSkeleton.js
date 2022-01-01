import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const FaqSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <div style={{ margin: '10px' }}>
        <Skeleton count={4} width={`100%`} height={40} />
      </div>
    </SkeletonTheme>
  );
};

export default FaqSkeleton;
