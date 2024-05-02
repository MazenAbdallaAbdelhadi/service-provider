import { Redirect, Tabs } from "expo-router";
import {
  CalendarRange,
  FileText,
  Home,
  MessageCircleMore,
  User,
} from "lucide-react-native";
import { useAuth } from "@/context/auth-context";
import { ActivityIndicator, View } from "react-native";
import CustomText from "@/components/ui/custom-text";

const Layout = () => {
  const { authState, isLoading } = useAuth();

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={50} color={"#7C3AFF"} />
      </View>
    );

  if (!authState.isAuth) return <Redirect href="/login" />;

  return (
    <Tabs
      safeAreaInsets={{ bottom: 12 }}
      screenOptions={() => ({
        tabBarActiveTintColor: "#7c3aed",
        tabBarHideOnKeyboard: true,
        headerTitleAlign: "center",
        headerTitle(props) {
          return (
            <CustomText className="text-xl" weight="bold">
              {props.children}
            </CustomText>
          );
        },
      })}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "الرئيسية",
          headerShown: false,
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
          tabBarStyle: {
            display: "flex",
          },
          href: "/",
        }}
      />

      <Tabs.Screen
        name="booking"
        options={{
          title: "الحجوزات",
          tabBarIcon: ({ color }) => <FileText color={color} size={24} />,
          headerShadowVisible: false,
          href: "/booking",
        }}
      />

      <Tabs.Screen
        name="inbox/index"
        options={{
          title: "البريد",
          tabBarIcon: ({ color }) => (
            <MessageCircleMore color={color} size={24} />
          ),
          href: "/inbox",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: " الملف الشخصي",
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
          href: "/profile",
        }}
      />
    </Tabs>
  );
};

export default Layout;
