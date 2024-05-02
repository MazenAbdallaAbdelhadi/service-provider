import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/context/auth-context";
import placeholder from "@/assets/person.png";
import CustomText from "@/components/ui/custom-text";
import Button from "@/components/ui/button";
import { Bell, Search, Star, StarHalf } from "lucide-react-native";
import { Link } from "expo-router";
import { PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categories-api";
import { getServices } from "@/lib/api/services-api";
import ServiceCard from "@/components/shared/service-card";
import CategoryCard from "@/components/shared/category-card";
import { useCategory } from "@/context/categories-context";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="justify-center items-center">
          <Header />
          <Section showAllHref="/profile" title="العروض" padding="px-3">
            <Offers />
          </Section>

          <Section showAllHref="/all-categories" title="التصنيفات">
            <Categories />
          </Section>

          <Section
            showAllHref="/profile"
            title="الخدمات الاكثر طلبا"
            padding="px-3"
          >
            <Services />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const Header = () => {
  const { authState } = useAuth();
  const user = authState.user;

  return (
    <View className="w-full flex-row justify-between px-2 border-b border-gray-200 pb-2">
      <View className="flex-row items-center gap-2">
        <Image
          className="w-[50px] h-[50px] rounded-full"
          source={
            authState.user?.profileImage
              ? { uri: authState.user?.profileImage }
              : placeholder
          }
        />
        <View>
          <CustomText>أهلا 👋</CustomText>
          <CustomText className="text" weight="bold">
            {user?.name}
          </CustomText>
        </View>
      </View>

      <View className="flex-row gap-4">
        <Button className="p-2 w-[40] h-[40px]  bg-violet-300 justify-center items-center">
          <Search className="w-[35px] h-[35px] text-white" />
        </Button>
        <Button className="p-2 w-[40px] h-[40px] bg-violet-300 justify-center items-center">
          <Bell className="w-[35px] h-[35px] text-white" />
        </Button>
      </View>
    </View>
  );
};

type SectionProps = {
  title: string;
  showAllHref: string;
  padding?: string;
} & PropsWithChildren;

const Section = ({ children, title, showAllHref, padding }: SectionProps) => {
  return (
    <View className="w-full my-6">
      <View className="flex-row justify-between px-3">
        <CustomText className="text-xl" weight="bold">
          {title}
        </CustomText>
        <Link href={showAllHref} asChild>
          <TouchableOpacity activeOpacity={0.7}>
            <CustomText className="text-violet-600" weight="bold">
              عرض الكل
            </CustomText>
          </TouchableOpacity>
        </Link>
      </View>

      <View className={padding}>{children}</View>
    </View>
  );
};

const Offers = () => {
  return (
    <View className="h-[200px] border border-dashed border-violet-600 rounded-3xl" />
  );
};

const Categories = () => {
  const { categories, isLoading } = useCategory();

  if (isLoading)
    return (
      <View className="h-[200px] justify-center items-center">
        <ActivityIndicator size="large" color="#7C3AFF" />
      </View>
    );

  return (
    <View className="flex-row flex-wrap">
      {categories.slice(0, 8).map((category) => (
        <View className="w-1/4 px-2" key={category._id}>
          <CategoryCard key={category._id} category={category} />
        </View>
      ))}
    </View>
  );
};

const Services = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices({ limit: 5, category: undefined }),
  });

  if (isLoading)
    return (
      <View className="h-[200px] justify-center items-center">
        <ActivityIndicator size="large" color="#7C3AFF" />
      </View>
    );

  const services = data?.data.docs;

  return (
    <View className="gap-4 mt-4 px-3 -mr-4">
      {services!.map((s, i) => (
        <ServiceCard service={s} key={i} />
      ))}
    </View>
  );
};
