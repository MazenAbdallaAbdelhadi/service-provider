import { View } from "react-native";
import React from "react";
import UpdatePasswordForm from "@/components/forms/(profile)/update-password-form";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";

const UpdatePassowrd = () => {
  return (
    <View className="px-4 py-8">
      <TouchableWithoutFeedback
        className="flex-1"
        onPress={() => Keyboard.dismiss()}
      >
        <UpdatePasswordForm />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default UpdatePassowrd;
