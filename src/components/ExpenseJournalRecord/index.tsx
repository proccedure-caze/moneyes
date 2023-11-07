import { StyleSheet, Platform, Text, View } from "react-native";
import { Dot, ExpenseJournalRecordView, RightContainer } from "./styles";
import { Expense } from "../../types/expense";
import { formatBRL } from "../../utils";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

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
  const naviation = useNavigation();

  const redirectToEdition = () =>
    naviation.navigate("RegisterExpenses", { id: expense.id! });

  return (
    <ExpenseJournalRecordView style={styles.shadow} onPress={redirectToEdition}>
      <Dot color={expense.color} />
      <RightContainer>
        <View style={{ gap: 4 }}>
          <Text>{expense.title}</Text>
          <Text>{expense.recurring && "Recorrente"}</Text>
        </View>

        <View style={{ gap: 4 }}>
          <Text>{formatBRL(expense.amount)}</Text>
          <Text style={{ textAlign: "right" }}>
            {dayjs(expense.start_date.toDate()).format("MMM DD")}
          </Text>
        </View>
      </RightContainer>
    </ExpenseJournalRecordView>
  );
}
