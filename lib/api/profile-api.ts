import { z } from "zod";
import { ResponseObject } from "../interfaces/response";
import { Token, User } from "../interfaces/user";
import api from "./api";
import {
  editeProfileSchema,
  updatePasswordSchema,
} from "../schema/profile-schema";

export const getProfile = async () => {
  try {
    return api.get<ResponseObject<User>>("v1/users/getMe");
  } catch (error) {
    console.log("ERROR IN GET_PROFILE: ", error);
  }
};

export const editeProfile = async (
  data: z.infer<typeof editeProfileSchema>
) => {
  try {
    return (await api.put<ResponseObject<null>>("v1/users/updateMe", data))
      .data;
  } catch (error) {
    console.log("ERROR IN EDITE_PROFILE: ", error);
  }
};

export const updatePassword = async (
  data: z.infer<typeof updatePasswordSchema>
) => {
  try {
    return (
      await api.put<ResponseObject<Token>>("v1/users/changeMyPassword", data)
    ).data;
  } catch (error) {
    console.log("ERROR IN UPDATE_PASSWORD: ", error);
  }
};
