import React from 'react';
import MultipleChoice from './MultipleChoice';
import MultipleResponse from './MultipleResponse';
import FillInTheBlanks from './FillInTheBlanks';

const QuestionAnswers = ({ singleQuestion, practiceChapters , pResultId}) => {
  return (
    <>
      {singleQuestion.questionType === 1 && (
        <MultipleChoice singleQuestion={singleQuestion} practiceChapters={practiceChapters} pResultId={pResultId}/>
      )}
      {singleQuestion.questionType === 2 && (
        <MultipleResponse singleQuestion={singleQuestion} />
      )}
      {singleQuestion.questionType === 4 && (
        <FillInTheBlanks singleQuestion={singleQuestion} />
      )}
    </>
  );
};

export default QuestionAnswers;
