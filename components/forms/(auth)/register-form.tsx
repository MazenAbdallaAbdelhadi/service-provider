import { useEffect } from "react";
import { View } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as SecureStore from "expo-secure-store";

import Input from "@/components/ui/input";
import CustomText from "@/components/ui/custom-text";
import Button from "@/components/ui/button";
import Avatar from "@/components/ui/avatar";
import { registerSchema } from "@/lib/schema/auth-schema";
import { register } from "@/lib/api/auth-api";

const RegisterForm = () => {
  const queryClient = useQueryClient();

  // TODO: SHOW TOAST ON SUCCESS OR ON ERROR
  const { mutate, data, isPending, error, isError } = useMutation({
    mutationFn: register,
    mutationKey: ["profile"],
  });

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      bio: undefined,
      profileImage: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log("=".repeat(20));

    console.log("DATA:", data);
    mutate(data);

    console.log("=".repeat(20));
  };
  const setImage = (image: string) => {
    form.setValue("profileImage", image);
  };

  useEffect(() => {
    const saveToken = async (token: string) => {
      await SecureStore.setItemAsync("token", token);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    };

    if (data?.data) {
      saveToken(data.data.token);
    }
  }, [data]);

  return (
    <FormProvider {...form}>
      <View className="items-center gap-4">
        <Avatar setImage={setImage} />
        <CustomText>صورة الملف</CustomText>
      </View>

      <Input name="name" label="الأسم*" placeholder="john doe" />

      <Input name="bio" label="اللقب" placeholder="Software Eng." />

      <Input
        name="email"
        label="البريد الاكتروني*"
        placeholder="user@email.com"
      />

      <Input
        name="password"
        label="كلمة المرور*"
        secureTextEntry
        placeholder="••••••••"
      />
      <Input
        name="passwordConfirm"
        label="تأكيد كلمة المرور*"
        secureTextEntry
        placeholder="••••••••"
      />

      <Button
        onPress={form.handleSubmit(handleSubmit)}
        disabled={form.formState.isLoading || isPending}
        className={`mt-8 ${
          (form.formState.isLoading || isPending) && "bg-violet-400/40"
        }`}
      >
        تسجيل
      </Button>
    </FormProvider>
  );
};

export default RegisterForm;
