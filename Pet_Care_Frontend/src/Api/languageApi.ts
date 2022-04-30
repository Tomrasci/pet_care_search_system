import http from "../Utils/httpRequestBody";
const getLanguages = async () => {
  const { data, status } = await http.get("/languages");

  return data;
};

export default { getLanguages };
