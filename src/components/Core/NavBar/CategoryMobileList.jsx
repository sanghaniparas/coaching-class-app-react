import React, { useEffect, useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { BASE_URL } from './../../../config';
import {
    ArrowDown
  } from '../Layout/Icon';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import SubCategoryMobileList from './SubCategoryMobileList';

const CategoryMobileList = (props) => {
    const [category, setCategory] = useState([]);
    const [subcategoryList, setSubCategoryList] = useState([]);
    // Mobile sub category sidebar
    const subCategoryOpen = (catId) => {
        let subCatObj = category.find(c => c.id === parseInt(catId));
        let newArr = [];
        let arr = subCatObj.home_page_category_exam_types;
        arr.forEach((el) => {
            if (el.home_page_category_exam_type_exam_names.length > 0) {
                newArr.push(el.examTypeName);
            }
            el.home_page_category_exam_type_exam_names.forEach((x) => newArr.push(x));
        });
        if(newArr.length) {
            setSubCategoryList(newArr);
            props.subCategoryToggle();
        }
    }
    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data: { data }, } = await axios.get(`${BASE_URL}/homePage`);
                setCategory(data.home_page_categories);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, []);

    return (
        <div>
            <div className={`category-menu-wrap active`}>
                <h3 onClick={props.mobileCategoryClose} className="heading">
                    <div className="title">
                        <span className="arrow"><ArrowDown /></span> Menu
                    </div>
                </h3>
                {
                    category.length ? (
                        <ul>
                            {
                                category.map((catList, index) => (
                                    <li onClick={() => subCategoryOpen(catList.id)} key={index}>
                                        <img src={catList.sectionLogoUrl} alt="" />
                                        {catList.sectionName} <span><ArrowDown /></span>
                                    </li>
                                ))
                            }
                        </ul>
                    ):(
                        <div style={{ minHeight: '100vh' }}>
                            <Loader
                                style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                }}
                                type="Oval"
                                color="#FF7249"
                                height={40}
                                width={40}
                              
                            />
                        </div>
                    )
                }
            </div>
            {props.subcategory && <SubCategoryMobileList 
                subcategoryList={subcategoryList}
                mobileCategoryClose={props.mobileCategoryClose}
                subCategoryClose={props.subCategoryClose}
            />}
        </div>
        
    );
};

export default CategoryMobileList;
