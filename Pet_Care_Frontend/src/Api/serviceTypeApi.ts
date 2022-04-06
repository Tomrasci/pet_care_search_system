import http from "../Utils/httpRequestBody";

const getServiceTypes = async () => {
  const { data, status } = await http.get("/serviceTypes");

  return data;
};

export default { getServiceTypes };
