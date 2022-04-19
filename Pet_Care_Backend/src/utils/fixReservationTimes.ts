import { IGotReservation } from '../models/interfaces/IGotReservation';
import { IReservation } from '../models/interfaces/IReservation';
export default function fixReservationTimes(
  reservationArray: IGotReservation[]
) {
  const fixedArray: IReservation[] = reservationArray.map((reservation) => ({
    startTime: reservation.timeInterval.split('-')[0],
    endTime: reservation.timeInterval.split('-')[1],
    date: reservation.date,
    user_id: reservation.user_id,
    advertisement_id: reservation.advertisement_id,
    status: reservation.status,
    description: reservation.description
  }));
  return fixedArray;
}
