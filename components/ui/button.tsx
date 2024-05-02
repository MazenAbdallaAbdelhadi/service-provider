import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import CustomText from "./custom-text";

interface Props extends TouchableOpacityProps {
  weight?:
    | "extra-light"
    | "light"
    | "regular"
    | "medium"
    | "semi-bold"
    | "bold"
    | "extra-bold"
    | "black";
}

const Button = ({ children, weight, ...props }: Props) => {
  return (
    <TouchableOpacity
      className="w-full bg-violet-400 p-4 rounded-md justify-center"
      activeOpacity={0.7}
      {...props}
    >
      <CustomText className="text-center text-white" weight={weight}>
        {children}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Button;
