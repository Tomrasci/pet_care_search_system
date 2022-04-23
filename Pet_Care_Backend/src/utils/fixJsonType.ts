import pushValuesToStringArray from './pushValuesToStringArray';

export default function fixJSONType(timeIntervals: string) {
  const fixedArray = timeIntervals.split(',');
  const lastArray = pushValuesToStringArray(fixedArray);
  return lastArray;
}
