import React from 'react';
import PurchasePassItem from './PurchasePassItem';
import PurchasePackageItem from './PurchasePackageItem';

const PurchaseHistoryItem = ({ item }) => {
  return item.cart_data.map((element) =>
    element.package_data === null ? (
      <PurchasePassItem
        item={item}
        element={element.pass_data}
        extraElementInfo={element}
      />
    ) : (
      <PurchasePackageItem
        item={item}
        element={element.package_data}
        extraElementInfo={element}
      />
    )
  );
};

export default PurchaseHistoryItem;
