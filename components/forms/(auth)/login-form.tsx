import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as SecureStore from "expo-secure-store";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { loginSchema } from "@/lib/schema/auth-schema";
import { login } from "@/lib/api/auth-api";
import { useAuth } from "@/context/auth-context";

const LoginForm = () => {
  const queryClient = useQueryClient();

  // TODO: SHOW TOAST ON SUCCESS OR ON ERROR
  const { mutate, data, isPending, error, isError } = useMutation({
    mutationFn: login,
    mutationKey: ["profile"],
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log("=".repeat(20));

    console.log("DATA:", data);
    mutate(data);
    console.log("=".repeat(20));
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
      <Input
        name="email"
        label="البريد الاكتروني"
        placeholder="user@email.com"
        keyboardType="email-address"
      />
      <Input
        name="password"
        label="كلمة المرور"
        placeholder="••••••••"
        secureTextEntry
      />

      <Button
        className={`mt-8 ${isPending && "bg-violet-400/40"}`}
        onPress={form.handleSubmit(handleSubmit)}
        disabled={form.formState.isLoading || isPending}
      >
        تسجيل الدخول
      </Button>
    </FormProvider>
  );
};

export default LoginForm;
