import { ComponentProps, ReactNode } from "react";
import { StyleSheet, Platform } from "react-native";
import { ButtonContainer, ButtonContent } from "./styles";

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

type Button = ComponentProps<typeof ButtonContainer> & {
  children: ReactNode;
  textColor?: string;
  backgroundColor?: string;
};

export function Button({
  children,
  textColor = "#000",
  backgroundColor = "#FFF",
  style = { button: {}, text: {} },
  ...props
}: Button) {
  return (
    <ButtonContainer
      style={{ ...style.button, backgroundColor, ...styles.shadow }}
      {...props}
    >
      <ButtonContent
        style={{ ...style.text, color: textColor, backgroundColor }}
      >
        {children}
      </ButtonContent>
    </ButtonContainer>
  );
}
