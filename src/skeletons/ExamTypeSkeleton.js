import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ExamTypeSkeleton = () => {
  return (
    <SkeletonTheme color="#ddd">
      <div
        style={{
          textAlign: 'center',
          padding: '2.4rem',
          display: 'flex',
          justifyContent: 'space-around',
          width: '80%',
          margin: 'auto',
        }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2].map((el) => (
          <Skeleton circle={true} height={60} width={60} />
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default ExamTypeSkeleton;
