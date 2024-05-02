import {
  KeyboardAvoidingView,
  ModalProps,
  Modal as RNModal,
  Text,
} from "react-native";
import React from "react";

interface Props extends ModalProps {}

const Modal = ({ children, ...props }: Props) => {
  return (
    <RNModal
      className="w-full h-full justify-center items-center"
      animationType="fade"
      transparent
      statusBarTranslucent
      {...props}
    >
      <KeyboardAvoidingView className="flex-1 justify-center items-center bg-zinc-900/40">
        {children}
      </KeyboardAvoidingView>
    </RNModal>
  );
};

export default Modal;
