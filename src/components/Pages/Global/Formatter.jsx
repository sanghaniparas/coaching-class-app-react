export const filterPassType = (passType) => {
  if(passType){
    if(passType.toLowerCase().includes("plus")){
      return 'plus';
    }else if(passType.toLowerCase().includes("premium")){
      return 'premium';
    } else {
      return 'pro';
    }
  }
  return 'pro';
}

export const searchItemFormat = (listItem, section) => {
  let response=[];
  let innerList=[];
  if(listItem){
    for(let i=0; i<listItem.length;i++){
      if(Number.isInteger(i/section)){
        response.push(innerList);
        innerList=[];
      }
      if(i===(listItem.length-1)){
        response.push(innerList);
      }
      innerList.push(listItem[i]);
    }
  }
  return response;
}