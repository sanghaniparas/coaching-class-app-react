import React, { useState } from 'react';

export default function useSubTabsData(initialValue) {
  const [subTabsData, setSubTabsData] = useState(initialValue);
  const obj = {};

  subTabsData.forEach((el) => {
    obj[el.packageTestType.testTypeName] =
      (obj[el.packageTestType.testTypeName] || 0) + 1;
  });

  const newData = Object.values(obj);

  return [newData, setSubTabsData];
}
