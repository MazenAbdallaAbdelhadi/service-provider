import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import CustomText from "@/components/ui/custom-text";
import LoginForm from "@/components/forms/(auth)/login-form";

const LoginScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 justify-center items-center ">
          <CustomText className="text-3xl">تسجيل الدخول</CustomText>
          {/* login form */}
          <View className="w-full p-4">
            <LoginForm />
          </View>

          <Link href="/forget-password" asChild>
            <CustomText className="underline my-4">نسيت كلمة المرور؟</CustomText>
          </Link>

          <View>
            <CustomText>
              ليس لديك حساب؟{" "}
              <Link href="/register" asChild>
                <CustomText className="text-violet-600" weight="bold">
                  أنشاء حساب جديد
                </CustomText>
              </Link>
            </CustomText>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;
