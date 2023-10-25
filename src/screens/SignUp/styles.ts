import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const SignUpContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.COLORS.GRAY_LIGHT};
  flex: 1;
`;

export const SignUpContent = styled.View`
  padding: 20px;
  gap: 10px;
`;

export const InputsContainer = styled.View`
  gap: 4px;
`;
