import React from 'react';
import { PostCard } from './../../Dashboard/Layout/PostCard/PostCard';

export default function TestBlogs({ data }) {
   
  return (
    <div className="a-wrapper blog-section">
     {data && data.examPageBlogList.length > 0 ? <div className="a-container">
        
      <div className="header-wrap">
        <h2 className="">News &amp; Update</h2>
        <a href="https://admisure.com/blog" className="viewall-btn" >View All</a>
      </div>

      <div className="postcard-wrapper">
        {data.examPageBlogList.map((item) => (
          <PostCard key={item.id} item={item} />
        ))}
      </div>

      </div> : <React.Fragment>
      <div className="a-container"><div className="header-wrap"><h2 className="">News &amp; Update</h2> </div></div>
          <div className="a-nodata-Content">No data found</div>
        </React.Fragment>}
    </div>
  );
}
