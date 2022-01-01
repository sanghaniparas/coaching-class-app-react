import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function CustomDropdownCheckbox({
  itemList,
  respondSelectedItem,
  keyItem,
  type,
  reset,
  placeholder
}) {
  const wrapperRef = useRef(null);
  const [dropdown, setdropdown] = useState(false);
  const [itemSeclected, setItemSelected] = useState('');
  const [label, setLabelSelected] = useState();

 

  
  useEffect(() => {
    console.log(keyItem)
    if (reset) {
      setItemSelected(itemList && itemList[0].id.toString());
      setLabelSelected(itemList && `<span>${itemList[0][keyItem]}</span>`);
    }
  }, [reset]);



  useEffect(() => {

    if(keyItem === 'examType'){
      if (itemList && itemList[0][keyItem] !== 'Exam Type') {
        itemList && itemList.unshift({ id: 0, [keyItem]: 'Exam Type' });        
      }
    }else{
      if (itemList && itemList[0][keyItem] !== 'All') {
        itemList && itemList.unshift({ id: 0, [keyItem]: 'All' });        
      }
    }
    if(!!placeholder){
      setLabelSelected(itemList && `<span>${placeholder}</span>`);
    } else {
      setLabelSelected(itemList && `<span>${itemList[0][keyItem]}</span>`);
    }
    setItemSelected(itemList && itemList[0].id.toString());
    
  },[itemList]);
  const filterType = (event) => {  
    let selectedString = '';
    let labelString = '';
    if (event.target.id.split("-")[1] != 0) {
      const res = itemSeclected.split(',');
      const staticObjFilter = res.filter((item, key) => {
        if (item == event.target.id.split("-")[1]) {
          return item;
        }
      });
      if (staticObjFilter.length > 0) {
        const objFilter = res.filter((item, key) => {
          if (item != event.target.id.split("-")[1]) {
            return item;
          }
        });   
        if(objFilter.length>0){
          objFilter.map((item,i)=>{
              if(!selectedString){
                selectedString = `${item}`;
                //console.log(document.getElementById(`${type}-${item}`).value);
                labelString= `<span>${document.getElementById(`${type}-${item}`).value}</span>`;
              }else{
                selectedString = `${selectedString},${item}`;
                labelString= `${labelString}, <span>${document.getElementById(`${type}-${item}`).value}</span>`;
              }
          });
          setLabelSelected(labelString);
        } else {
          setItemSelected(itemList[0].id.toString());
          setLabelSelected(itemList && `<span>${itemList[0][keyItem]}</span>`);
          respondSelectedItem('');
        }
        if (selectedString.charAt(0) == ',') {
          selectedString = selectedString.substring(1);
        }
        setItemSelected(selectedString);
        respondSelectedItem(selectedString);
      }else{
        if(itemSeclected.charAt(0)=='0' || itemSeclected.charAt(0)==''){          
          selectedString =`${itemSeclected.substr(2)}${event.target.id.split("-")[1]}`;
          labelString= `<span>${event.target.value}</span>`;
        }else{
          selectedString =`${itemSeclected},${event.target.id.split("-")[1]}`;
          labelString= `${label},<span>${event.target.value}</span>`;
        }
        setItemSelected(selectedString);
        setLabelSelected(labelString);
        respondSelectedItem(selectedString);
      }

    } else {
      setItemSelected(itemList[0].id.toString());
      setLabelSelected(itemList && `<span>${itemList[0][keyItem]}</span>`);
      respondSelectedItem('');
    }
    setdropdown(!dropdown);
  }
  const dropdownToggleHandler = () => setdropdown(!dropdown);
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setdropdown(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);
  const isSelected = (value) => {
    const res = itemSeclected.split(',');
    const staticObjFilter = res.filter((item, key) => {
      if (item == value) {
        return item;
      }
    });
    return staticObjFilter.length > 0 && true || false;
  }
  return (
    <React.Fragment>
      {label && <div className="custom-dropdown" ref={wrapperRef}>
          <button className="btn" onClick={dropdownToggleHandler}>{ReactHtmlParser(label)}</button>
          {dropdown && <ul>              
            {itemList && itemList.map((el, idx) => (                
              <li key={idx}>
                <p className="custom-checkbox">
                  {console.log('show', itemSeclected.includes(el[keyItem]))}
                  <input type="checkbox" name="" id={`${type}-${el.id}`} value={el[keyItem]}
                    onChange={(event)=>filterType(event)}
                    checked={isSelected(el.id)}
                    // checked={label.includes(el[keyItem])}
                  />
                  <label htmlFor={`${type}-${el.id}`}> {el[keyItem]}</label>
                </p>
              </li>
            ))}
          </ul>}
      </div>}
    </React.Fragment>
  )
}
