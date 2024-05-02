import { View, ScrollView, RefreshControl } from "react-native";
import React from "react";
import { useBookMark } from "@/context/bookmark-context";
import ServiceCard from "@/components/shared/service-card";
import { useQueryClient } from "@tanstack/react-query";

const BookMark = () => {
  const { wishlist } = useBookMark();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    const refetchServices = async () => {
      try {
        setRefreshing(true);
        await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      } catch (error) {
        console.log("ERROR", error);
      } finally {
        setRefreshing(false);
      }
    };
    refetchServices();
  }, []);

  return (
    <ScrollView
      className="p-3"
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <View className="pb-5">
        {wishlist.map((item) => (
          <ServiceCard key={item._id} service={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default BookMark;
