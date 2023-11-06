import styled from "styled-components/native";
import { TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { css } from "styled-components/native";

export const InputContainer = styled.View`
  display: "flex";
  flex-direction: "column";
  gap: 2px;
`;

type InputTextContainer = {
  error?: boolean;
};

export const InputTextContainer = styled.View<InputTextContainer>`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: ${({ theme }) => theme.RADII.XS};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  padding: 2px 10px;

  ${({ error, theme }) =>
    error &&
    css`
      border: 1px solid ${theme.COLORS.RED};
    `}
`;

export const InputText = styled(TextInput)`
  flex: 1;
`;

export const InputMaskText = styled(TextInputMask)`
  flex: 1;
`;

export const ErrorText = styled.Text<InputTextContainer>`
  color: ${({ theme, error }) =>
    error ? theme.COLORS.RED : theme.COLORS.WHITE};
`;
