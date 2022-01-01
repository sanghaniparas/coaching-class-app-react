import React, { useState } from 'react';
import { Minus, Plus } from '../../Core/Layout/Icon';

export default function Accordion({ title, question, children }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="accordion-wrapper">
      <div
        className={`accordion-title ${isOpen ? 'open' : ''}`}
        onClick={() => setOpen(!isOpen)}>
        <span>
          {isOpen ? (
            <img
              width="20"
              src={require('../../../assets/images/minus (1).png')}
            />
          ) : (
            <img width="20" src={require('../../../assets/images/plus.png')} />
          )}
        </span>
        <p>{title}</p>
        {question && <p className={`question-p`}>{question}</p>}
        
      </div>
      <div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
}
