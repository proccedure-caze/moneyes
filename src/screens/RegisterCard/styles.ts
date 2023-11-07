import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const RegisterCardContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.COLORS.GRAY_LIGHT};
  flex: 1;
  padding-right: 20px;
  padding-left: 20px;
`;
