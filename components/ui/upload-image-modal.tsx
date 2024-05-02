import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "./modal";
import { Camera, Images, Trash2, X } from "lucide-react-native";
import CustomText from "./custom-text";

interface Props {
  visable: boolean;
  onClosePress?: () => void;
  onCameraPress?: () => void;
  onGallaryPress?: () => void;
  onRemoveImagePress?: () => void;
  disableRemove?: boolean;
}

const UploadImageModal = ({
  visable,
  onClosePress,
  onCameraPress,
  onGallaryPress,
  onRemoveImagePress,
  disableRemove,
}: Props) => {
  return (
    <Modal visible={visable}>
      <View className="bg-white p-4 rounded">
        {/* MODAL CLOSE BUTTON */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="self-end mb-4"
          onPress={onClosePress}
        >
          <X className="w-[30] h-[30] text-black" />
        </TouchableOpacity>

        <View className="flex-row gap-4">
          {/* CAMERA BUTTON */}
          <View className="justify-center items-center gap-2">
            <TouchableOpacity
              className="w-[50px] h-[50px] rounded-full bg-gray-200 justify-center items-center"
              activeOpacity={0.7}
              onPress={onCameraPress}
            >
              <Camera className="w-[30] h-[30] text-black" />
            </TouchableOpacity>
            <CustomText>الكاميرا</CustomText>
          </View>

          {/* GALLARY BUTTON */}
          <View className="justify-center items-center gap-2">
            <TouchableOpacity
              className="w-[50px] h-[50px] rounded-full bg-gray-200 justify-center items-center"
              activeOpacity={0.7}
              onPress={onGallaryPress}
            >
              <Images className="w-[30] h-[30] text-black" />
            </TouchableOpacity>
            <CustomText>معرض الصور</CustomText>
          </View>

          {/* REMOVE IMAGE BUTTON */}
          {!disableRemove && (
            <View className="justify-center items-center gap-2">
              <TouchableOpacity
                className="w-[50px] h-[50px] rounded-full bg-gray-200 justify-center items-center"
                activeOpacity={0.7}
                onPress={onRemoveImagePress}
              >
                <Trash2 className="w-[30] h-[30] text-black" />
              </TouchableOpacity>
              <CustomText>ازالة الصورة</CustomText>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UploadImageModal;
