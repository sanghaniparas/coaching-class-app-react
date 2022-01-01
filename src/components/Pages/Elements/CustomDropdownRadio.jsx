import React, { useState, useRef, useEffect } from 'react';

export default function CustomDropdownRadio({ itemList,fromTest, respondSelectedItem,selectedItem, keyItem, type, reset, selectFisrtItem, placeholder }) {


  const wrapperRef = useRef(null);
  const [dropdown, setdropdown] = useState(false);
  const [itemSeclected, setItemSelected]= useState(itemList &&  itemList[0].id);
  const [label, setLabelSelected]= useState(itemList && itemList[0][keyItem]);




  useEffect(() => {
    if (reset) {
      setItemSelected(itemList && itemList[0].id);
      setLabelSelected(itemList && itemList[0][keyItem]);
    }
  }, [reset]);

  useEffect(() => { 
  
    if(!selectFisrtItem){
      if(itemList && itemList[0][keyItem] !== 'All'){
        itemList && itemList.unshift({id:0,[keyItem]:'All'});
      }    
    }
    if (!!placeholder) {
      setLabelSelected(itemList && placeholder);
    } else {
      setLabelSelected(itemList && itemList[0][keyItem]);
    }

    if(type === 'price'){
      
      if(selectFisrtItem){
        setItemSelected(itemList  &&  itemList[selectFisrtItem].id); 
      }else{
        setItemSelected(itemList  &&  itemList[0].id); 
      }


      
    }
    else if(type === 'sortBy'){
    
        if(selectFisrtItem){
          setItemSelected(itemList  &&  itemList[selectFisrtItem].id); 
        }else{
          setItemSelected(itemList  &&  itemList[0].id); 
        }
      
     
    }
    else{
      setItemSelected(itemList  &&  itemList[0].id); 
    }
    
    
     
    

      
     
  },[itemList])
  const filterType = (event) => {
    setItemSelected(event.target.id.split('-')[1]);
    setLabelSelected(event.target.value);
    respondSelectedItem(event.target.id.split('-')[1]);
    setdropdown(!dropdown);
  };
  const dropdownToggleHandler = () => setdropdown(!dropdown);
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setdropdown(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);
  return (
    <React.Fragment>
      {label && (
        <div className="custom-dropdown" ref={wrapperRef}>
          <button className="btn" onClick={dropdownToggleHandler}>
            {label}
          </button>
          {dropdown && (
            <ul>
              {itemList &&
                itemList.map((el, idx) => (
                  <li key={idx}>
                    <p className="custom-radio">
                      <input
                        type="radio"
                        name=""
                        id={`${type}-${el.id}`}
                        value={el[keyItem]}
                        onChange={(event) => filterType(event)}
                        checked={itemSeclected == el.id}
                      />
                      <label htmlFor={`${type}-${el.id}`}> {el[keyItem]}</label>
                    </p>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </React.Fragment>
  );
}
