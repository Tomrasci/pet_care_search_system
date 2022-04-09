import http from "../Utils/httpRequestBody";
import { ILanguageType } from "../Interfaces/Caretaker/ILanguageType";
const getLanguages = async () => {
  const { data, status } = await http.get("/languages");

  return data;
};

export default { getLanguages };
