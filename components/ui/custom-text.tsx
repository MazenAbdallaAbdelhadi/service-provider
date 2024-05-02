import { Text, TextProps } from "react-native";
import React, { PropsWithChildren, forwardRef } from "react";

const ExtraLight = forwardRef<TextProps, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    return (
      <Text className="font-[cairo-200]" {...props}>
        {children}
      </Text>
    );
  }
);

const Light = forwardRef<TextProps, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    return (
      <Text className="font-[cairo-300]" {...props}>
        {children}
      </Text>
    );
  }
);

const Regular = forwardRef<TextProps, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    return (
      <Text className="font-[cairo-400]" {...props}>
        {children}
      </Text>
    );
  }
);

const Medium = forwardRef<TextProps, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    return (
      <Text className="font-[cairo-500]" {...props}>
        {children}
      </Text>
    );
  }
);

const SemiBold = forwardRef<TextProps, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    return (
      <Text className="font-[cairo-600]" {...props}>
        {children}
      </Text>
    );
  }
);

const Bold = forwardRef<TextProps, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    return (
      <Text className="font-[cairo-700]" {...props}>
        {children}
      </Text>
    );
  }
);

const ExtraBold = forwardRef<TextProps, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    return (
      <Text className="font-[cairo-800]" {...props}>
        {children}
      </Text>
    );
  }
);
const Black = forwardRef<TextProps, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    return (
      <Text className="font-[cairo-900]" {...props}>
        {children}
      </Text>
    );
  }
);

interface Props extends TextProps {
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
const fontFamilies = {
  "extra-light": ExtraLight,
  light: Light,
  regular: Regular,
  medium: Medium,
  "semi-bold": SemiBold,
  bold: Bold,
  "extra-bold": ExtraBold,
  black: Black,
};

const CustomText = forwardRef(
  ({ weight = "regular", ...props }: Props, ref) => {
    const Component = fontFamilies[weight];

    return <Component {...props} />;
  }
);

export default CustomText;
