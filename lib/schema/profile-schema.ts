import { z } from "zod";

export const editeProfileSchema = z.object({
  name: z.string().min(3, "الاسم يجب ان يتكون من 3 احرف على الاقل").optional(),
  bio: z.string().optional(),
  profileImage: z.string().optional(),
});

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z
      .string({ required_error: "كلمة المرور مطلوبة" })
      .min(8, "كلمة المرور يجب ان تكون 8 احرف على الاقل"),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "كلمة المرور غير صحيحة",
    path: ["newPasswordConfirm"],
  });
