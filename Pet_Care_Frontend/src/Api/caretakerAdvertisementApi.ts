import { ICaretakerAdvertCreate } from "../Interfaces/Caretaker/ICaretakerAdvertCreate";
import http from "../Utils/httpRequestBody";

const createCaretakerAdvertisement = async (
  caretakerAdvert: ICaretakerAdvertCreate
) => {
  return await http.post("/caretakerAdverts", caretakerAdvert);
};

const getCaretakerAdvertisements = async () => {
  const { data, status } = await http.get("/caretakerAdverts");
  return data;
};

const getUserCaretakerAdvertisements = async (userId: number) => {
  const { data, status } = await http.get(`/myAdverts/${userId}`);
  return data;
};

const getCaretakerAdvertisement = async (id: number) => {
  const { data, status } = await http.get(`/caretakerAdverts/${id}`);
  return data;
};

const editCaretakerAdvertisement = async (
  id: number,
  caretakerAdvert: ICaretakerAdvertCreate
) => {
  return await http.put(`/caretakerAdverts/${id}`, caretakerAdvert);
};

const deleteCaretakerAdvertisement = async (id: number) => {
  return await http.delete(`/caretakerAdverts/${id}`);
};

const getCaretakerPets = async (id: number) => {
  const { data, status } = await http.get(`/caretakerPets/${id}`);
  return data;
};
const getCaretakerServices = async (id: number) => {
  const { data, status } = await http.get(`/caretakerServices/${id}`);
  return data;
};
const getCaretakerLanguages = async (id: number) => {
  const { data, status } = await http.get(`/caretakerLanguages/${id}`);
  return data;
};

const getCaretakerAvailability = async (id: number) => {
  const { data } = await http.get(`/caretakerAvailability/${id}`);
  return data;
};

const uploadCaretakerImage = async (id: number, file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data, status } = await http.post(
    `/uploadCaretakerImage/${id}`,
    formData
  );
  console.log(`data is ${data}`);
  console.log(`status is ${status}`);
  return status;
};

export default {
  createCaretakerAdvertisement,
  getCaretakerAdvertisement,
  getCaretakerAdvertisements,
  editCaretakerAdvertisement,
  deleteCaretakerAdvertisement,
  getUserCaretakerAdvertisements,
  getCaretakerPets,
  getCaretakerServices,
  getCaretakerLanguages,
  getCaretakerAvailability,
  uploadCaretakerImage,
};
