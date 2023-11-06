import { StyleSheet, Platform } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Dot, ExpenseJournalRecordView, RightContainer } from "./styles";
import { Expense } from "../../types/expense";
import { formatBRL } from "../../utils";
import dayjs from "dayjs";

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

type ExpenseJournalRecordProps = {
  expense: Expense;
};

export function ExpenseJournalRecord({ expense }: ExpenseJournalRecordProps) {
  return (
    <ExpenseJournalRecordView style={styles.shadow}>
      <Dot color={expense.color} />
      <RightContainer>
        <View style={{ gap: 4 }}>
          <Text>{expense.title}</Text>
          {expense.recurring && <Text>Recorrente</Text>}
        </View>

        <View style={{ gap: 4 }}>
          <Text>{formatBRL(expense.amount)}</Text>
          <Text>{dayjs(expense.start_date.toDate()).format("MMM DD")}</Text>
        </View>
      </RightContainer>
    </ExpenseJournalRecordView>
  );
}
