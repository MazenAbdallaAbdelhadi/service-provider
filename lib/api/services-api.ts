import api from "./api";
import { ResponseObject, PaginatedData } from "../interfaces/response";
import { Service } from "../interfaces/service";

export const getServices = async ({
  limit,
  category,
}: {
  limit: number;
  category?: string;
}) => {
  try {
    return (
      await api.get<ResponseObject<PaginatedData<Service>>>("v1/service", {
        params: { limit, category },
      })
    ).data;
  } catch (error) {
    console.log("ERROR IN GET SERVICES API: ", error);
  }
};
