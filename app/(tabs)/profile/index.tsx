import { useAuth } from "@/context/auth-context";
import { Image, Pressable } from "react-native";
import { View, Text, Button } from "react-native";
import placeholder from "@/assets/person.png";
import CustomText from "@/components/ui/custom-text";
import { Link } from "expo-router";
import {
  ArrowLeft,
  Bookmark,
  Lock,
  LogOut,
  MapPin,
  User,
} from "lucide-react-native";

const ProfileScreen = () => {
  const {
    logout,
    authState: { user },
  } = useAuth();

  return (
    <View className="flex-1 items-center pt-8 bg-white">
      <View className="p-3 w-full ">
        <View className="items-center border-b border-gray-300 pb-2">
          <Image
            source={
              user?.profileImage ? { uri: user.profileImage } : placeholder
            }
            className="w-[200] h-[200] rounded-full"
          />
          <CustomText className="text-lg" weight="bold">
            {user?.name}
          </CustomText>
          <CustomText className="text-gray-400">{user?.email}</CustomText>
        </View>
      </View>

      <View className="w-full p-3 flex-1">
        <View className="border border-gray-100 rounded-xl p-3">
          {/* edit profile link */}
          <Link href="/profile/edit-profile" asChild>
            <Pressable className="flex-row justify-between w-full mb-2 py-2 border-b border-gray-200">
              <View className="flex-row gap-2">
                <User className="w-[35] h-[35] text-black" />
                <CustomText>تعديل الملف الشخصي</CustomText>
              </View>
              <ArrowLeft className="w-[35] h-[35] text-black" />
            </Pressable>
          </Link>

          {/* edit password link */}
          <Link href="/profile/update-password" asChild>
            <Pressable className="flex-row justify-between w-full mb-2 py-2 border-b border-gray-200">
              <View className="flex-row gap-2">
                <Lock className="w-[35] h-[35] text-black" />
                <CustomText>تعديل كلمة المرور</CustomText>
              </View>
              <ArrowLeft className="w-[35] h-[35] text-black" />
            </Pressable>
          </Link>

          {/* bookmark link */}
          <Link href="/profile/bookmark" asChild>
            <Pressable className="flex-row justify-between w-full mb-2 py-2 border-b border-gray-200">
              <View className="flex-row gap-2">
                <Bookmark className="w-[35] h-[35] text-black" />
                <CustomText>الخدمات المحفوظة</CustomText>
              </View>
              <ArrowLeft className="w-[35] h-[35] text-black" />
            </Pressable>
          </Link>

          {/* address link */}
          {/* <Link href="/" asChild>
            <Pressable className="flex-row justify-between w-full mb-2 py-2 border-b border-gray-200">
              <View className="flex-row gap-2">
                <MapPin className="w-[35] h-[35] text-black" />
                <CustomText>قائمة العنواين</CustomText>
              </View>
              <ArrowLeft className="w-[35] h-[35] text-black" />
            </Pressable>
          </Link> */}
        </View>
      </View>

      <View className="w-full px-3 py-4">
        <Pressable
          className="flex-row justify-between p-3 border rounded-lg border-red-500"
          onPress={() => logout()}
        >
          <View className="flex-row-reverse gap-2">
            <CustomText className="text-red-500">تسجيل الخروج</CustomText>
            <LogOut className="w-[35] h-[35] text-red-500" />
          </View>
          <ArrowLeft className="w-[35] h-[35] text-red-500" />
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;
