import api from "./api";
import { ResponseObject, PaginatedData } from "../interfaces/response";
import { Category } from "../interfaces/category";

export const getCategories = async () => {
  try {
    return (
      await api.get<ResponseObject<PaginatedData<Category>>>("v1/categories")
    ).data;
  } catch (error) {
    console.log("ERROR IN GET CATEGOREIS API: ", error);
  }
};
