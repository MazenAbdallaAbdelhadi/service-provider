import React from "react";
import { Stack } from "expo-router";
import CustomText from "@/components/ui/custom-text";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: "",
          headerRight: () => {
            return (
              <CustomText className="text-lg" weight="bold">
                تعديل الملف الشخصي
              </CustomText>
            );
          },
        }}
      />

      <Stack.Screen
        name="update-password"
        options={{
          title: "",
          headerRight: () => {
            return (
              <CustomText className="text-lg" weight="bold">
                تعديل كلمة المرور
              </CustomText>
            );
          },
        }}
      />

      <Stack.Screen
        name="bookmark"
        options={{
          title: "",
          headerRight: () => {
            return (
              <CustomText className="text-lg" weight="bold">
                قائمة الخدمات المحفوظة
              </CustomText>
            );
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
