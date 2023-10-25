import { ComponentProps } from "react";
import { ButtonContainer, ButtonContent } from "./styles";

type Button = ComponentProps<typeof ButtonContainer> & {
  text: string;
  textColor?: string;
  backgroundColor?: string;
};

export function Button({
  text,
  textColor = "#000",
  backgroundColor = "#FFF",
  style,
  ...props
}: Button) {
  return (
    <ButtonContainer style={{ ...style, backgroundColor }} {...props}>
      <ButtonContent style={{ color: textColor }}>{text}</ButtonContent>
    </ButtonContainer>
  );
}
