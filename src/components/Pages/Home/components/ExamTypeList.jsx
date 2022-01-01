import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import slug from '../../../../utils/slug';


const ExamTypeList = ({ data }) => {
  const [typeData, setTypeData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();
  

  
  useEffect(() => {
    let dataNumber = data.slice(0, 10);
    setTypeData(dataNumber);
    setIsShow(data.length>10?true:false);
    setCounter(dataNumber.length);
  }, [data]);

  const handleClick = (el) => {
    if (el.examDetailsExists === 0) return;

    history.push({
      pathname: `/exam/${slug(el.examName)}`,
      state: { examId:el.examId }
    });

   
  };

  const viewMore = () => {
    let incrementCounter = counter+5;
    let sliceData = data.slice(0, incrementCounter);
    setTypeData(sliceData);
    setIsShow(sliceData.length<data.length?true:false);
    setCounter(sliceData.length);
  }
  return (
    <div className="explore-box">
      <ul>
        {typeData.map((el,idx) => (
          <li onClick={() => handleClick(el)} 
            //style={ el.examDetailsExists === 0 ? `cursor: 'pointer'` : `cursor: 'none'`} 
            style={{cursor: el.examDetailsExists === 0 ? 'no-drop' : 'pointer'}}
            key={idx}
            >
            <img src={`${el.examNameLogoUrl}`} alt="profile pic" />
            <span>{el.examName}</span>
          </li>
        ))}
      </ul>
      {/* {data.length >= 15 && <a className="viewall-btn">View More</a>} */}
      {isShow && <a className="viewall-btn" onClick={() => viewMore()} style={{cursor: 'pointer'}}>View More</a>}
    </div>
  );
};

export default ExamTypeList;
