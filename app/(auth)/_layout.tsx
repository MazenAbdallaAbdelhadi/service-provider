import { useAuth } from "@/context/auth-context";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const AuthLayout = () => {
  const { authState } = useAuth();
  const router = useRouter();
  console.log(authState);
  
  useEffect(() => {
    if (authState.isAuth) router.navigate("/");
  }, [authState]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default AuthLayout;
