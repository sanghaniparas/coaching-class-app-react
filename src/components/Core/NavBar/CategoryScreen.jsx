import React from 'react';
import { UpcomingExam } from '../Layout/Icon';
import { useHistory } from 'react-router-dom';
import slug from '../../../utils/slug'


const CategoryName = (category, examId) => {
  let categoryName = typeof category === 'string' ? category : category.examName;
  const history = useHistory();


  const handleClick = (category) => {
    console.log(slug(categoryName))
    if (category && category.examNameId) {
      history.push({
        pathname: `/exam/${slug(categoryName)}`,
        state: { examId: category.examNameId }
      });
    }
  
  };

  console.log(category)
  return (
    category?.examDetailsExists === 1 ? 
    <a onClick={() => handleClick(category)} className={typeof category === 'string' && 'exam-title'}>
    {categoryName}
    {category.commingSoon === 1 && <UpcomingExam />}
  </a>
    
    : 

    <a  className={typeof category === 'string' && 'exam-title'}>
    {categoryName}
    {category.commingSoon === 1 && <UpcomingExam />}
  </a>
   
  )
}

const CategoryScreen = ({ screen, examId }) => {
  return (
    <div className="exam-column">
      {screen.map((el) => (
        CategoryName(el, examId)
      ))}
    </div>
  );
};

export default CategoryScreen;
