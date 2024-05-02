import { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "lucide-react-native";

import placeholder from "@/assets/person.png";
import UploadImageModal from "./upload-image-modal";

interface Props {
  setImage: (image: string) => void;
  defaultImage?: string;
  disableRemove?: boolean;
}

const Avatar = ({ defaultImage, setImage, disableRemove }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarImage, setAvatarImage] = useState<string | undefined>(
    defaultImage
  );

  const removeAvatarImage = () => {
    setAvatarImage(undefined);
    setIsModalOpen(false);
  };

  const uploadImageFromGallary = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // save image
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("FAILED TO UPLOAD IMAGE FROM GALLARY", error);
      setIsModalOpen(false);
    }
  };

  const uploadImageFromCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // save image
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("FAILED TO UPLOAD IMAGE FROM CAMERA", error);
      setIsModalOpen(false);
    }
  };

  const saveImage = (image: string) => {
    try {
      setAvatarImage(image);
      setImage(image);
      setIsModalOpen(false);
    } catch (error) {
      console.log("FAILED TO SAVE IMAGE", error);
    }
  };

  return (
    <View className="w-[150px] h-[150px] bg-gray-200  rounded-full relative">
      <Image
        className="flex-1 w-[150px] h-[150px] rounded-full"
        source={avatarImage ? { uri: avatarImage } : placeholder}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsModalOpen(true)}
        className="absolute w-[45px] h-[45px] right-0 bottom-0 bg-gray-700 rounded-full justify-center items-center"
      >
        <Camera className="w-[30] h-[30] text-white" />
      </TouchableOpacity>
      <UploadImageModal
        visable={isModalOpen}
        onClosePress={() => setIsModalOpen(false)}
        onCameraPress={() => uploadImageFromCamera()}
        onGallaryPress={() => uploadImageFromGallary()}
        onRemoveImagePress={() => removeAvatarImage()}
        disableRemove={disableRemove}
      />
    </View>
  );
};

export default Avatar;
