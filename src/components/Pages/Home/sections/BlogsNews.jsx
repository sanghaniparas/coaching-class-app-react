import React from 'react';
import { PostCard } from '../../../Core/Layout/PostCard/PostCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectBlogsData } from '../../../../redux/homepage/homepage.selectors';

import postImage1 from '../../../../assets/images/post-01.jpg';
import postImage2 from '../../../../assets/images/post-02.jpeg';
import postImage3 from '../../../../assets/images/post-03.jpg';
import avatarImg from '../../../../assets/images/post-avatar.png';
import CardSkeleton from '../../../../skeletons/CardSkeleton';

const BlogsNews = ({ blogData }) => {
  let reverBlogData = blogData?blogData.reverse():undefined;
  return (
    <div className="a-wrapper blog-section">
      <div className="a-container">
        <a href="https://admisure.com/blog" className="viewall">View All</a>
        <h2 className="text-center"> Blogs, News and Updates</h2>
        <p className="text-center blog-pera">
        Explore Admisure’s blog for the latest exam updates including all your exam preparation. 
        </p>

        {/* <a className="viewmore-btn">View All</a> */}
        <div className="postcard-wrapper">
        {reverBlogData === undefined ? (
          <CardSkeleton />
        ) : (
          reverBlogData.map((item) => <PostCard key={item.id} item={item} />)

          )}        
        </div>
      </div>

    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  blogData: selectBlogsData,
});

export default connect(mapStateToProps)(BlogsNews);
