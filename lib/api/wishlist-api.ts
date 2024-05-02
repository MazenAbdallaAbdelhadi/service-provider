import api from "./api";
import { ResponseObject } from "../interfaces/response";
import { Wishlist } from "../interfaces/wishlist";

export const getMyWishlist = async () => {
  try {
    return (await api.get<ResponseObject<Wishlist>>("v1/wishlist")).data;
  } catch (error) {
    console.log("ERROR IN GET WISHLIST API: ", error);
  }
};

export const addToWishlist = async (serviceId: string) => {
  try {
    return (await api.post<ResponseObject<null>>("v1/wishlist", { serviceId }))
      .data;
  } catch (error) {
    console.log("ERROR IN ADD SERVICE TO WISHLIST API: ", error);
  }
};

export const removeFromWishlist = async (serviceId: string) => {
  try {
    return (
      await api.delete<ResponseObject<null>>("v1/wishlist", {
        data: { serviceId },
      })
    ).data;
  } catch (error) {
    console.log("ERROR IN REMOVE SERVICE FROM WISHLIST API: ", error);
  }
};
