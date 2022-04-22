export default function pushValuesToStringArray(givenArray: any) {
  const stringArray: string[] = [];
  givenArray.forEach((element) => {
    stringArray.push(element);
  });
  return stringArray;
}
