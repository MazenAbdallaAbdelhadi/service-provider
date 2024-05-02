import { View, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import CategoryCard from "@/components/shared/category-card";
import { useCategory } from "@/context/categories-context";

const AllCategories = () => {
  const { categories, isLoading } = useCategory();
  if (isLoading)
    return (
      <View className="h-full justify-center items-center">
        <ActivityIndicator size="large" color="#7C3AFF" />
      </View>
    );

  return (
    <View className="py-6">
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item }) => <CategoryCard category={item} />}
      />
    </View>
  );
};

export default AllCategories;
