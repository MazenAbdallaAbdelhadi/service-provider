import { View, TextInput, TextInputProps } from "react-native";
import CustomText from "./custom-text";
import {
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";

interface Props extends TextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
}

const Input = ({ label, defaultValue, name, ...props }: Props) => {
  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? "TextInput must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  const { field, fieldState } = useController({ name, defaultValue });

  return (
    <View>
      <CustomText className="mb-2 mt-4">{label}</CustomText>
      <TextInput
        className="px-4 py-2 bg-gray-200 rounded-md text-black"
        cursorColor={"#000"}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        {...props}
      />
      {fieldState.invalid && (
        <CustomText className="text-sm text-red-500 mt-2" weight="bold">
          {fieldState.error?.message}*
        </CustomText>
      )}
    </View>
  );
};

export default Input;
