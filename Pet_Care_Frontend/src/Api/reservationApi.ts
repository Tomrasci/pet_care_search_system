import http from "../Utils/httpRequestBody";
import { IReservation } from "../Interfaces/IReservation";
import authHeader from "../Authentication/authHeader";

const createReservations = async (reservation: IReservation) => {
  return await http.post("/reservations", reservation, {
    headers: authHeader(),
  });
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
  const { data, status } = await http.get(`/ownerReservations/${userId}`, {
    headers: authHeader(),
  });
  return data;
};

const getAdvertisementReservations = async (adId: number) => {
  const { data, status } = await http.get(`/advertisementReservations/${adId}`);
  return data;
};

const getAdvertisementReservationsWithUser = async (adId: number) => {
  const { data, status } = await http.get(
    `/advertisementReservationsWithUser/${adId}`,
    { headers: authHeader() }
  );
  return data;
};

const getReservation = async (id: number) => {
  const { data, status } = await http.get(`/reservations/${id}`);
  return data;
};

const confirmReservation = async (id: number) => {
  return await http.post(`/reservations/confirm/${id}`, {
    headers: authHeader(),
  });
};

const cancelReservation = async (id: number) => {
  return await http.post(`/reservations/cancel/${id}`, {
    headers: authHeader(),
  });
};

export default {
  createReservations,
  getAdvertisementReservations,
  getOwnerReservations,
  getReservation,
  getReservations,
  confirmReservation,
  cancelReservation,
  getConfirmedAdvertisementReservations,
  getAdvertisementReservationsWithUser,
};
