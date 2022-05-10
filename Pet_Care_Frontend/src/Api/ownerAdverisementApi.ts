import http from "../Utils/httpRequestBody";
import { IOwnerAdvertCreate } from "../Interfaces/Owner/IOwnerAdvertCreate";
import authHeader from "../Authentication/authHeader";

const createOwnerAdvertisement = async (ownerAdvert: IOwnerAdvertCreate) => {
  return await http.post("/ownerAdverts", ownerAdvert);
};

const getOwnerAdvertisements = async () => {
  const { data, status } = await http.get("/OwnerAdverts");
  return data;
};

const getUserOwnerAdvertisement = async (userId: number) => {
  const { data, status } = await http.get(`/myOwnerAdvert/${userId}`, {
    headers: authHeader(),
  });
  return data;
};

const getOwnerAdvertisement = async (id: number) => {
  const { data, status } = await http.get(`/OwnerAdverts/${id}`, {
    headers: authHeader(),
  });
  return data;
};

const editOwnerAdvertisement = async (
  id: number,
  ownerAdvert: IOwnerAdvertCreate
) => {
  return await http.put(`/ownerAdverts/${id}`, ownerAdvert, {
    headers: authHeader(),
  });
};

const deleteOwnerAdvertisement = async (id: number) => {
  return await http.delete(`/ownerAdverts/${id}`, { headers: authHeader() });
};

const getOwnerPets = async (id: number) => {
  const { data, status } = await http.get(`/ownerPets/${id}`, {
    headers: authHeader(),
  });
  return data;
};
const getOwnerServices = async (id: number) => {
  const { data, status } = await http.get(`/ownerServices/${id}`, {
    headers: authHeader(),
  });
  return data;
};
const getOwnerLanguages = async (id: number) => {
  const { data, status } = await http.get(`/ownerLanguages/${id}`, {
    headers: authHeader(),
  });
  return data;
};

const uploadOwnerImage = async (id: number, file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data, status } = await http.post(
    `/uploadOwnerImage/${id}`,
    formData,
    { headers: authHeader() }
  );

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
  uploadOwnerImage,
};
