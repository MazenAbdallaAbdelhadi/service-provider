import { z } from "zod";
import api from "./api";
import { loginSchema, registerSchema } from "../schema/auth-schema";
import { ResponseObject } from "../interfaces/response";
import { Token } from "../interfaces/user";

export const register = async (data: z.infer<typeof registerSchema>) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("passwordConfirm", data.passwordConfirm);

    if (data.bio && !!data.bio.trim()) formData.append("bio", data.bio);

    if (data.profileImage && !!data.profileImage.trim()) {
      const imageUri = data.profileImage; // Assuming profileImage is a URI string

      // Get image details (optional)
      const response = await fetch(imageUri); // Fetch the image to get type and filename
      const imageType = response.headers.get("Content-Type"); // Extract content type
      const filename = imageUri.split("/").pop(); // Extract filename from URI (if available)

      // Append image to FormData with appropriate details
      formData.append("profileImage", {
        uri: imageUri,
        type: imageType || "image/jpeg", // Default to JPEG if type unknown
        name: filename || "profile-image.jpg", // Default filename if not provided
      });
    }

    console.log("FORM DATA BEFORE SENDING", formData);

    return (
      await api.post<ResponseObject<Token>>("v1/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  } catch (error) {
    console.log("ERROR IN REGISTER API: ", error);
  }
};

export const login = async (data: z.infer<typeof loginSchema>) => {
  try {
    return (await api.post<ResponseObject<Token>>("v1/auth/login", data)).data;
  } catch (error) {
    console.log("ERROR IN LOGIN API: ", error);
  }
};
