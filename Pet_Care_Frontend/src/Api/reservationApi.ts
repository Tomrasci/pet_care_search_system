import http from "../Utils/httpRequestBody";
import { IReservation } from "../Interfaces/IReservation";

const createReservations = async (reservs: {
  reservations: IReservation[];
}) => {
  return await http.post("/reservations", reservs);
};

const getReservations = async () => {
  const { data, status } = await http.get("/reservations");
  return data;
};

const getOwnerReservations = async (userId: number) => {
  const { data, status } = await http.get(`/ownerReservations/${userId}`);
  return data;
};

const getAdvertisementReservations = async (adId: number) => {
  const { data, status } = await http.get(`/advertisementReservations/${adId}`);
  return data;
};

const getReservation = async (id: number) => {
  const { data, status } = await http.get(`/reservations/${id}`);
  return data;
};

// const editReservation= async (
//   id: number,
//   caretakerAdvert: ICaretakerAdvertCreate
// ) => {
//   return await http.put(`/caretakerAdverts/${id}`, caretakerAdvert);
// };

const deleteReservations = async (uid: number, aid: number) => {
  return await http.delete(`/caretakerAdverts/${uid}/${aid}`);
};

export default {
  createReservations,
  getAdvertisementReservations,
  getOwnerReservations,
  getReservation,
  getReservations,
  deleteReservations,
};
