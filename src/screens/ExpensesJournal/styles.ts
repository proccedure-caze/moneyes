import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const ExpensesJournalContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.COLORS.GRAY_LIGHT};
  flex: 1;
  padding-bottom: 8px;
`;

export const ScreenDescription = styled.Text`
  font-size: 16px;
  text-align: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: ${({ theme }) => theme.RADII.LG};
  padding: 14px;
  margin-bottom: 10px;
`;

export const UnderlinedText = styled.Text`
  font-size: 16px;
  text-align: center;
  font-weight: 700;
  text-decoration: underline;
`;
