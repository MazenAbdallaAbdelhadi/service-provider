import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/lib/api/services-api";
import ServiceCard from "@/components/shared/service-card";
import CustomText from "@/components/ui/custom-text";

const ServiceByCategory = () => {
  const { category } = useLocalSearchParams();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["services", category],
    queryFn: () => getServices({ category: category as string, limit: 20 }),
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    const refetchServices = async () => {
      try {
        setRefreshing(true);
        await refetch();
      } catch (error) {
        console.log("ERROR", error);
      } finally {
        setRefreshing(false);
      }
    };
    refetchServices();
  }, []);

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7C3AFF" />
      </View>
    );

  const services = data?.data.docs;

  return (
    <View className="pt-5 px-3 flex-1">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {services?.length! > 0 ? (
          services?.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        ) : (
          <View className="h-full justify-center items-center">
            <CustomText className="text-4xl pt-4">لا يوجد خدمات</CustomText>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ServiceByCategory;
