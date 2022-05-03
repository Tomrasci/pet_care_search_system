import http from "../Utils/httpRequestBody";
import { IReservation } from "../Interfaces/IReservation";

//reservs: {
//   reservations: IReservation[];
// }
const createReservations = async (reservation: IReservation) => {
  return await http.post("/reservations", reservation);
};

const getReservations = async () => {
  const { data, status } = await http.get("/reservations");
  return data;
};

const getConfirmedAdvertisementReservations = async (adId: number) => {
  const { data, status } = await http.get(`/reservations/confirmed/${adId}`);
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

const deleteReservations = async (uid: number, aid: number) => {
  return await http.delete(`/caretakerAdverts/${uid}/${aid}`);
};

const confirmReservation = async (id: number) => {
  return await http.post(`/reservations/confirm/${id}`);
};

const cancelReservation = async (id: number) => {
  return await http.post(`/reservations/cancel/${id}`);
};

export default {
  createReservations,
  getAdvertisementReservations,
  getOwnerReservations,
  getReservation,
  getReservations,
  deleteReservations,
  confirmReservation,
  cancelReservation,
  getConfirmedAdvertisementReservations,
};
