import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {
    ArrowDown, UpcomingExam
  } from '../Layout/Icon';

const SubCategoryMobileList = (props) => {

    return (
        <div className={`category-menu-wrap active`}>
            <h3 className="heading">
                <div className="title" onClick={() => { props.mobileCategoryClose(); props.subCategoryClose() }}>
                    <span className="arrow"><ArrowDown /></span> Menu
                </div>
                <div className="title" onClick={props.subCategoryClose}>
                    <span className="arrow"><ArrowDown /></span> All Category
                </div>
            </h3>
            <ul>
                {
                    props.subcategoryList.map((subCat, subIndex) => (
                       
                        <li key={subIndex} className={`${typeof subCat === 'string' && 'exam-title'}`}>
                            {typeof subCat === 'string'? subCat: subCat.examDetailsExists ? <a href={`testdetail/${subCat.examNameId}`}>{subCat.examName}</a> : subCat.examName}
                            {typeof subCat === 'string' && <span><ArrowDown /></span>}
                            {typeof subCat !== 'string' && subCat.commingSoon === 1 && <UpcomingExam />}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
export default SubCategoryMobileList;
