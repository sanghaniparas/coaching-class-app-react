import React from 'react';

const EachQuestionSerialNumber = ({ item, handleSingleQuestion,idx }) => {
  var activeidx = JSON.parse(localStorage.getItem('countP'))
 
    
   
  return (
    
      <div
      style={activeidx==idx ? { "border":"2px dotted white","transform":"scale(1.2)","boxShadow":"0 0 10px grey","transition":"1s ease-in-0ut"}:{}}
      onClick={() => handleSingleQuestion(item.id)}
      key={item.questionSerialNo}
      className={`item ${item.state === 'unseen' && 'darkblue-bg'} ${
        item.state === 'skipped' && 'lightblue-bg'
      } ${item.state === 'answered' && item.isCorrect && 'green-bg'} ${
        item.state === 'answered' && !item.isCorrect && 'red-bg'
      }`}>
      {item.questionSerialNo}
    </div>
    
  );
};

export default EachQuestionSerialNumber;
