import http from "../Utils/httpRequestBody";
import { IPetType } from "../Interfaces/Caretaker/IPetType";

const getPetTypes = async () => {
  const { data, status } = await http.get("/petTypes");

  return data;
};

export default { getPetTypes };
