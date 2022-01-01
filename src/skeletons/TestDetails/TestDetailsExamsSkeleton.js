import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TestDetailsExamsSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      {[1, 2, 3].map((el) => (
        <div style={{ margin: '1rem 0' }}>
          <Skeleton height={80} width={900} />
        </div>
      ))}
    </SkeletonTheme>
  );
};

export default TestDetailsExamsSkeleton;
