import React, { useEffect, useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { BASE_URL } from './../../../config';
import axios from 'axios';
import CategoryScreen from './CategoryScreen';
import { UpcomingExam } from '../Layout/Icon';

const CategoryList = ({setcategory}) => {
  const [category, setCategory] = useState([]);
  const [examType, setExamTypes] = useState([]);
  const [examNameListing, setExamNameListing] = useState([]);
  const [catId, setCatId] = useState(null);
  const [examId, setExamId] = useState(null);

  // For fetching category details

  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const {
          data: { data },
        } = await axios.get(`${BASE_URL}/homePage`);
        let subCat = [];
        if(data.home_page_categories.length) {
          subCat = data.home_page_categories[0].home_page_category_exam_types;
        }
        let catId = data.home_page_categories.length?data.home_page_categories[0].id:null;
        setCategory(data.home_page_categories);
        setCatId(catId);
        setExamTypes(subCat);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCategories();
  }, []);

  //   For setting category exam types
  const setCategoryExamTypes = (id) => {
    console.log("okay");
    const value = category.find((el) => el.id === id);
    setExamTypes(value.home_page_category_exam_types);
    setCatId(id);
  };

  // For listing exam names
  const showExamNameListing = (arr) => {
    let newArr = [];
    arr.forEach((el) => {
      if (el.home_page_category_exam_type_exam_names.length > 0) {
        newArr.push(el.examTypeName);
      }
      el.home_page_category_exam_type_exam_names.forEach((x) => newArr.push(x));
    });

    const result = chunkArray(newArr, 14);
    setExamNameListing(result);
    let setExamSubId = result[0].length? isNaN(result[0][0])?result[0][0]:result[0][0].examName:null;
    setExamId(setExamSubId);
  };

  //   Splitting the array into screens
  function chunkArray(myArray, chunk_size) {
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];
    let myChunk;

    for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }
    return tempArray;
  }

  useEffect(() => {
    if (examType.length) {
      showExamNameListing(examType);
    }
  }, [examType]);

  return (
    <div className="category-dropdown">
      {category.length === 0 ? (
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
      ) : (
        <div className="scroll">
          <div className="main-header">
            <ul>
              {category.map((el, i) => (
                <li onClick={() => setCategoryExamTypes(el.id)} key={i}>
                  <div >
                    <img src={el.sectionLogoUrl} alt="" />
                    <span>{el.sectionName}</span>
                  </div>
                </li>
              ))}

             
            </ul>
            <div className={`upcoming-exam`}>
              <UpcomingExam />
              <span>Upcoming Exam</span>
            </div>
          </div>
          <div className="main-content">
            <div className="tab-content">
              {examNameListing.map((screen) => (
                <CategoryScreen screen={screen} examId={examId} />
              ))}

             
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
