import React from 'react';
import {SerachType} from '../Global/Constant';

export default function SearchSubMenu({isSubTab, handleSelectedSection}) {
 console.log("isSubTab--------", isSubTab)
  return (
      <ul className="search-tab-items">
        {SerachType.map((item, idx) => (
            <li key={idx} className={isSubTab === item.label ? 'active' : ''}
                onClick={() => handleSelectedSection(item)}>
                {item.label}
            </li>
        ))}
        {/* <li className="active">All</li>
        <li>Coaching</li>
        <li>Test Series</li>
        <li>Practice</li>
        <li>Quiz</li> */}
      </ul>
  )
}
