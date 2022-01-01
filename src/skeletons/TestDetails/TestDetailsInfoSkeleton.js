import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TestDetailsInfoSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      {[1, 2, 3].map((el) => (
        <p style={{ marginBottom: '10px' }} key={el}>
          <Skeleton width={500} height={40} />
        </p>
      ))}
    </SkeletonTheme>
  );
};

export default TestDetailsInfoSkeleton;
