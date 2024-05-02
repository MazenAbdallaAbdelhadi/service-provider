import CustomText from "@/components/ui/custom-text";
import { useCategory } from "@/context/categories-context";
import { Stack, useLocalSearchParams } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerBackTitle: "العودة" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="all-categories"
        options={{
          title: "",
          headerRight(props) {
            return (
              <CustomText className="text-lg pt-1" weight="bold">
                كل التصنيفات
              </CustomText>
            );
          },
        }}
      />

      <Stack.Screen
        name="services/[category]"
        options={{
          headerTitle: "",
          headerRight() {
            const { categories } = useCategory();
            const { category } = useLocalSearchParams();

            const categoryName = categories.find(
              (c) => c._id === category
            )?.name;

            return (
              <CustomText className="text-lg pt-1" weight="bold">
                {categoryName}
              </CustomText>
            );
          },
        }}
      />

      <Stack.Screen
        name="[service]"
        options={{
          headerTitle: "",
        }}
      />
    </Stack>
  );
};

export default Layout;
