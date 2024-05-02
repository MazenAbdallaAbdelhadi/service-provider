import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Input from "@/components/ui/input";
import CustomText from "@/components/ui/custom-text";
import Button from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import Avatar from "@/components/ui/avatar";
import * as SecureStore from "expo-secure-store";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updatePasswordSchema } from "@/lib/schema/profile-schema";
import { updatePassword } from "@/lib/api/profile-api";

const UpdatePasswordForm = () => {
  // TODO: SHOW TOAST ON SUCCESS OR ON ERROR
  const { mutate, data, isPending, error, isError } = useMutation({
    mutationFn: updatePassword,
  });

  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof updatePasswordSchema>) => {
    console.log("=".repeat(20));

    console.log("DATA:", data);
    mutate(data);

    console.log("=".repeat(20));
  };

  useEffect(() => {
    const saveToken = async (token: string) => {
      await SecureStore.setItemAsync("token", token);
    };

    if (data?.data) {
      saveToken(data?.data?.token);
    }
  }, [data]);

  return (
    <FormProvider {...form}>
      <Input
        name="oldPassword"
        label="كلمة المرور القديمة*"
        secureTextEntry
        placeholder="••••••••"
      />

      <Input
        name="newPassword"
        label="كلمة المرور الجديدة*"
        secureTextEntry
        placeholder="••••••••"
      />

      <Input
        name="newPasswordConfirm"
        label="تأكيد كلمة المرور الجديدة*"
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
        تعديل كلمة المرور
      </Button>
    </FormProvider>
  );
};

export default UpdatePasswordForm;
