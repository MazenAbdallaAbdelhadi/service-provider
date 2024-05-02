import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "الاسم يجب ان يتكون من 3 احرف على الاقل"),
    email: z
      .string({
        required_error: "البريد الاكتروني مطلوب",
      })
      .email({ message: "يجب ادخال بريد الكتروني صالح" }),
    password: z
      .string({ required_error: "كلمة المرور مطلوبة" })
      .min(8, "كلمة المرور يجب ان تكون 8 احرف على الاقل"),
    passwordConfirm: z.string(),
    bio: z.string().optional(),
    profileImage: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "كلمة المرور غير صحيحة",
    path: ["passwordConfirm"],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "يجب ادخال بريد الكتروني صالح" }),
  password: z.string().min(8, "كلمة المرور يجب ان تكون 8 احرف على الاقل"),
});
