import { View } from "react-native";
import React, { useEffect } from "react";
import Input from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import Avatar from "@/components/ui/avatar";
import CustomText from "@/components/ui/custom-text";
import Button from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { editeProfileSchema } from "@/lib/schema/profile-schema";
import { editeProfile } from "@/lib/api/profile-api";
import { useAuth } from "@/context/auth-context";

const EditProfileForm = () => {
  const queryClient = useQueryClient();
  const {
    authState: { user },
  } = useAuth();

  // TODO: SHOW TOAST ON SUCCESS OR ON ERROR
  const { mutate, data, isPending, error, isError } = useMutation({
    mutationFn: editeProfile,
    mutationKey: ["profile"],
  });

  const form = useForm({
    resolver: zodResolver(editeProfileSchema),
    defaultValues: {
      name: user?.name,
      bio: user?.bio,
      profileImage: user?.profileImage,
    },
  });

  const handleSubmit = (data: z.infer<typeof editeProfileSchema>) => {
    console.log("=".repeat(20));

    let requestData: z.infer<typeof editeProfileSchema> = {};

    if (data.name !== user?.name) requestData["name"] = data.name;

    if (data.bio !== user?.bio) requestData["bio"] = data.bio;

    if (data.profileImage !== user?.profileImage)
      requestData["profileImage"] = data.profileImage;

    console.log("EDITE_PROFILE_DATA:", requestData);

    mutate(requestData);

    console.log("=".repeat(20));
  };

  const setImage = (image: string) => {
    form.setValue("profileImage", image);
  };

  //   invalidate profile data after update
  useEffect(() => {
    if (data) queryClient.invalidateQueries({ queryKey: ["profile"] });
  }, [data]);

  return (
    <FormProvider {...form}>
      <View className="items-center gap-4">
        <Avatar
          defaultImage={user?.profileImage}
          setImage={setImage}
          disableRemove
        />
        <CustomText>صورة الملف</CustomText>
      </View>

      <Input name="name" label="الأسم" placeholder="john doe" />

      <Input name="bio" label="اللقب" placeholder="Software Eng." />

      <Button
        onPress={form.handleSubmit(handleSubmit)}
        disabled={form.formState.isLoading || isPending}
        className={`mt-8 ${
          (form.formState.isLoading || isPending) && "bg-violet-400/40"
        }`}
      >
        تعديل الملف
      </Button>
    </FormProvider>
  );
};

export default EditProfileForm;
