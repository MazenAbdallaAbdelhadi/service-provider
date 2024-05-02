import { View, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import CustomText from "@/components/ui/custom-text";

import RegisterForm from "@/components/forms/(auth)/register-form";

const RegisterScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <TouchableWithoutFeedback
        className="flex-1"
        onPress={() => Keyboard.dismiss()}
      >
        <ScrollView className="flex-1">
          <View className="flex-1 items-center py-4">
            <CustomText className="text-3xl pt-4">أنشاء حساب جديد</CustomText>

            <View className="w-full p-4">
              <RegisterForm />
            </View>

            <View>
              <CustomText>
                لديك حساب بالفعل؟{" "}
                <Link href="/login" asChild>
                  <CustomText className="text-violet-600" weight="bold">
                    تسجيل الدخول
                  </CustomText>
                </Link>
              </CustomText>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterScreen;
