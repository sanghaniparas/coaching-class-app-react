import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="p-card ph-item">
      <div className="ph-picture"></div>
      <div className="ph-row">
        <div className="ph-col-7">
          <div className="line line-10"></div>
          <div className="line line-6"></div>
        </div>
        <div className="ph-col-3">
          <div className="ph-avatar up"></div>
          <div className="line line-3"></div>
          <div className="line line-10"></div>
        </div>
      </div>
      <br />
      <div className="ph-row">
        <div className="ph-col-10">
          <div className="line line-7"></div>
        </div>
      </div>
      <br />
      <div className="ph-row">
        <div className="ph-col-10">
          <div className="line line-10 big"></div>
        </div>
      </div>
      <br />
      <div className="ph-row">
        <div className="ph-col-4">
          <div className="line line-10"></div>
          <div className="line line-4"></div>
        </div>
        <div className="ph-col-4">
          <div className="line line-10"></div>
          <div className="line line-4"></div>
        </div>
        <div className="ph-col-4">
          <div className="line line-10"></div>
          <div className="line line-4"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
