import { View, Image } from "react-native";
import { Link } from "expo-router";
import { Category } from "@/lib/interfaces/category";
import CustomText from "../ui/custom-text";

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <View className="flex-1 justify-center items-center mb-2">
      <Link
        href={{
          pathname: `/services/${category._id}`,
        }}
      >
        <View>
          <Image
            source={{ uri: category.image }}
            className="rounded-full w-[75] h-[75]"
          />
          <CustomText className="mt-3 text-xs text-center" numberOfLines={1}>
            {category.name}
          </CustomText>
        </View>
      </Link>
    </View>
  );
};

export default CategoryCard;
