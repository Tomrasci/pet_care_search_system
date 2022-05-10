import authHeader from "../Authentication/authHeader";
import { ICaretakerAdvertCreate } from "../Interfaces/Caretaker/ICaretakerAdvertCreate";
import http from "../Utils/httpRequestBody";

const createCaretakerAdvertisement = async (
  caretakerAdvert: ICaretakerAdvertCreate
) => {
  return await http.post("/caretakerAdverts", caretakerAdvert, {
    headers: authHeader(),
  });
};

const getCaretakerAdvertisements = async () => {
  const { data, status } = await http.get("/caretakerAdverts");
  return data;
};

const getUserCaretakerAdvertisement = async (userId: number) => {
  const { data, status } = await http.get(
    `/myCaretakerAdvertisement/${userId}`,
    { headers: authHeader() }
  );
  return data;
};

const getCaretakerAdvertisement = async (id: number) => {
  const { data, status } = await http.get(`/caretakerAdverts/${id}`, {
    headers: authHeader(),
  });
  return data;
};

const editCaretakerAdvertisement = async (
  id: number,
  caretakerAdvert: ICaretakerAdvertCreate
) => {
  return await http.put(`/caretakerAdverts/${id}`, caretakerAdvert, {
    headers: authHeader(),
  });
};

const deleteCaretakerAdvertisement = async (id: number) => {
  return await http.delete(`/caretakerAdverts/${id}`, {
    headers: authHeader(),
  });
};

const getCaretakerPets = async (id: number) => {
  const { data, status } = await http.get(`/caretakerPets/${id}`, {
    headers: authHeader(),
  });
  return data;
};
const getCaretakerServices = async (id: number) => {
  const { data, status } = await http.get(`/caretakerServices/${id}`, {
    headers: authHeader(),
  });
  return data;
};
const getCaretakerLanguages = async (id: number) => {
  const { data, status } = await http.get(`/caretakerLanguages/${id}`, {
    headers: authHeader(),
  });
  return data;
};

const getCaretakerAvailability = async (id: number) => {
  const { data } = await http.get(`/caretakerAvailability/${id}`, {
    headers: authHeader(),
  });
  return data;
};

const uploadCaretakerImage = async (id: number, file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data, status } = await http.post(
    `/uploadCaretakerImage/${id}`,
    formData,
    { headers: authHeader() }
  );

  return status;
};

export default {
  createCaretakerAdvertisement,
  getCaretakerAdvertisement,
  getCaretakerAdvertisements,
  editCaretakerAdvertisement,
  deleteCaretakerAdvertisement,
  getUserCaretakerAdvertisement,
  getCaretakerPets,
  getCaretakerServices,
  getCaretakerLanguages,
  getCaretakerAvailability,
  uploadCaretakerImage,
};
