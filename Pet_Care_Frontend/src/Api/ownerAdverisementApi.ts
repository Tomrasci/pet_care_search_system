import http from "../Utils/httpRequestBody";
import { IOwnerAdvertCreate } from "../Interfaces/Owner/IOwnerAdvertCreate";

const createOwnerAdvertisement = async (ownerAdvert: IOwnerAdvertCreate) => {
  return await http.post("/ownerAdverts", ownerAdvert);
};

const getOwnerAdvertisements = async () => {
  const { data, status } = await http.get("/OwnerAdverts");
  return data;
};

const getUserOwnerAdvertisement = async (userId: number) => {
  const { data, status } = await http.get(`/myAdverts/${userId}`);
  return data;
};

const getOwnerAdvertisement = async (id: number) => {
  const { data, status } = await http.get(`/OwnerAdverts/${id}`);
  return data;
};

const editOwnerAdvertisement = async (
  id: number,
  ownerAdvert: IOwnerAdvertCreate
) => {
  return await http.put(`/ownerAdverts/${id}`, ownerAdvert);
};

const deleteOwnerAdvertisement = async (id: number) => {
  return await http.delete(`/ownerAdverts/${id}`);
};

const getOwnerPets = async (id: number) => {
  const { data, status } = await http.get(`/ownerPets/${id}`);
  return data;
};
const getOwnerServices = async (id: number) => {
  const { data, status } = await http.get(`/ownerServices/${id}`);
  return data;
};
const getOwnerLanguages = async (id: number) => {
  const { data, status } = await http.get(`/ownerLanguages/${id}`);
  return data;
};

const getOwnerAvailability = async (id: number) => {
  const { data } = await http.get(`/ownerAvailability/${id}`);
  return data;
};

const uploadOwnerImage = async (id: number, file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data, status } = await http.post(`/uploadOwnerImage/${id}`, formData);

  return status;
};

export default {
  createOwnerAdvertisement,
  getOwnerAdvertisement,
  getOwnerAdvertisements,
  editOwnerAdvertisement,
  deleteOwnerAdvertisement,
  getUserOwnerAdvertisement,
  getOwnerPets,
  getOwnerServices,
  getOwnerLanguages,
  getOwnerAvailability,
  uploadOwnerImage,
};
