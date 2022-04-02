import { ICaretakerAdvertCreate } from "../Interfaces/Caretaker/ICaretakerAdvertCreate";
import http from "../Utils/httpRequestBody";

const createCaretakerAdvertisement = async (
  caretakerAdvert: ICaretakerAdvertCreate
) => {
  return http.post("./caretakerAdverts", caretakerAdvert);
};

export default { createCaretakerAdvertisement };
