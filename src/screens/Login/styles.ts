import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const LoginContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.COLORS.GRAY_LIGHT};
  flex: 1;
`;

export const LoginContent = styled.View`
  gap: 10px;
  padding: 20px;
`;

export const InputsView = styled.View`
  gap: 4px;
`;

export const SignUpView = styled.View`
  gap: 10px;
  flex-direction: row;
  justify-content: center;
`;

export const NotRegisteredText = styled.Text`
  text-align: center;
`;

export const NotRegisteredButtonText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.RED};
  font-weight: bold;
`;
