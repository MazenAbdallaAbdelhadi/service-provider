import CustomText from "@/components/ui/custom-text";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { TabNavigationState, ParamListBase } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTobTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  return (
    <MaterialTobTabs
      screenOptions={{
        tabBarLabel(props) {
          return (
            <CustomText
              style={{ color: props.focused ? props.color : "black" }}
            >
              {props.children}
            </CustomText>
          );
        },
        tabBarActiveTintColor: "#7C3AFF",
        tabBarIndicatorStyle: { backgroundColor: "#7C3AFF" },
      }}
    >
      <MaterialTobTabs.Screen name="index" options={{ title: "القادمة" }} />
      <MaterialTobTabs.Screen
        name="completed"
        options={{ title: "المنتهية" }}
      />
      <MaterialTobTabs.Screen name="cancelled" options={{ title: "الملغية" }} />
    </MaterialTobTabs>
  );
};

export default Layout;
