import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import EditProfileForm from "@/components/forms/(profile)/edite-profile-form";

const EditProfile = () => {
  return (
    <View className="px-4 py-8">
      <TouchableWithoutFeedback
        className="flex-1"
        onPress={() => Keyboard.dismiss()}
      >
        <EditProfileForm />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default EditProfile;
