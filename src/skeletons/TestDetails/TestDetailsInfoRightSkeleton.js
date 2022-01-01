import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TestDetailsInfoRightSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      {[1, 2].map((el) => (
        <p style={{ marginBottom: '10px' }}>
          <Skeleton height={15} width={100} />
        </p>
      ))}
    </SkeletonTheme>
  );
};

export default TestDetailsInfoRightSkeleton;
