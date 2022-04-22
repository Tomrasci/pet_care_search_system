import pushValuesToStringArray from './pushValuesToStringArray';

export default function fixJSONType(timeIntervals: string) {
  //   const newArr = array.toString().replace(/['"]+/g, '');
  //   console.log(`newArr is ${newArr}`);
  //   const newArr2 = newArr.replace(/[\[\]']+/g, '');
  const fixedArray = timeIntervals.split(',');
  console.log(`fixed array is ${fixedArray}`);
  const lastArray = pushValuesToStringArray(fixedArray);
  return lastArray;
}
