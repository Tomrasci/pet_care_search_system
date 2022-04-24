import { INamesObject } from '../models/interfaces/INamesObject';

const MapObjectNamesToStringArray = (objectArray: INamesObject[]) => {
  let stringArray: string[] = [];

  stringArray = objectArray.map((object) => {
    return object.name;
  });

  return stringArray;
};
export default MapObjectNamesToStringArray;
