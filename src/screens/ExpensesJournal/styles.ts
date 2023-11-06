import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const ExpensesJournalContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.COLORS.GRAY_LIGHT};
  flex: 1;
  padding-bottom: 8px;
`;
