import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { Link } from "expo-router";
import {
  BookmarkCheck,
  BookmarkMinus,
  Star,
  StarHalf,
} from "lucide-react-native";

import CustomText from "../ui/custom-text";
import { Service } from "@/lib/interfaces/service";
import { useBookMarkApi } from "@/hooks/use-bookmark-api";

interface Props {
  service: Service;
}

const ServiceCard = ({ service }: Props) => {
  const {
    addMutate,
    removeMutate,
    isPendingAdd,
    isPendingRemove,
    isServiceInBookmark,
  } = useBookMarkApi();
  const isInBookMark = isServiceInBookmark(service._id);

  return (
    <View
      className="p-4 mb-3 rounded-2xl flex-row justify-between overflow-hidden bg-white"
      style={{
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "#7C3AFF",
      }}
    >
      {/* SERVICE COVER IMAGE */}
      <View className="rounded-3xl border border-gray-100  h-[125px] w-[125px]">
        <Image
          source={{ uri: service.coverImage }}
          className="h-full w-full rounded-3xl"
        />
      </View>

      <View className=" flex-1">
        <View className="flex-row justify-between w-full">
          {/* SERVICE DATA */}
          <View className="ml-4 flex-1">
            {/* PROVIDER NAME */}
            <CustomText className="text-left">
              {service.provider.name}
            </CustomText>

            {/* SERVICE TITLE */}
            <Link
              href={{
                pathname: `/[service]`,
                params: { service: service._id },
              }}
              asChild
            >
              <CustomText className="text-xl text-left" weight="bold">
                {service.title}
              </CustomText>
            </Link>

            {/* SERVICE PRICE */}
            <CustomText
              className="text-violet-600 text-lg text-left"
              weight="bold"
            >
              {service.price} EGP.
            </CustomText>
          </View>

          {/* ADD TO BOOKMARK BTN */}
          <View className="items-start flex-2">
            {isPendingAdd || isPendingRemove ? (
              <ActivityIndicator size="large" color={"#7C3AFF"} />
            ) : isInBookMark ? (
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-violet-100/40 rounded-full p-2 gray-40"
                onPress={() => removeMutate(service._id)}
              >
                <BookmarkCheck className="w-[40px] h-[40px] text-violet-600" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-violet-100/40 rounded-full p-2"
                onPress={() => addMutate(service._id)}
              >
                <BookmarkMinus className="w-[35px] h-[35px] text-violet-600" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* SERVICE RATING */}
        <View className="flex-1 flex-row  gap-3 p-3">
          <View className="pl-8">
            <View className="relative">
              <Star
                className="absolute right-2 top-0 w-[30] h-[30]"
                fill={"#f97316"}
                fillOpacity={0.4}
                strokeWidth={0}
              />
              <StarHalf
                className="absolute right-2 top-0 w-[30] h-[30]"
                fill={"#f97316"}
                strokeWidth={0}
              />
            </View>
          </View>
          <CustomText className="text-right">
            {service.ratingsAverage ? service.ratingsAverage.toFixed(1) : 0}
          </CustomText>
          <CustomText>|</CustomText>
          <CustomText>{service.ratingsQuantity || 0} تقييم</CustomText>
        </View>
      </View>
    </View>
  );
};

export default ServiceCard;
