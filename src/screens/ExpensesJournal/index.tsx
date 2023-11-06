import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Calendar } from "../../components/Calendar";
import { ExpenseJournalRecord } from "../../components/ExpenseJournalRecord";
import { ExpensesJournalContainer } from "./styles";
import { Button } from "../../components/Button";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { RouteProps } from "../../types/navigation";
import { getUserExpensesFromMonth } from "../../services/expenses";
import { Expense } from "../../types/expense";
import dayjs from "dayjs";

export default function ExpensesJournal({
  navigation,
}: RouteProps<"ExpensesJournal">) {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [records, setRecords] = useState<Expense[]>([]);

  const dayGotRecord = records.some((record) =>
    dayjs(record.start_date.toDate()).isSame(date, "date")
  );

  const handleAddNew = () => navigation.push("RegisterExpenses");

  const getMonthExpenses = async () => {
    try {
      setLoading(true);
      setRecords([]);
      const response = await getUserExpensesFromMonth(date.getMonth());
      const responseWithMonthDate = response
        .filter((res) => {
          const dateInDayjs = dayjs(date);

          if (res.recurring === true) return true;

          return dayjs(res.start_date.toDate())
            .set("year", dateInDayjs.get("year"))
            .set("month", dateInDayjs.get("month"))
            .isBefore(res.end_date?.toDate());
        })
        .map((res) => {
          const dateInDayjs = dayjs(date);
          return {
            ...res,
            start_date: firestore.Timestamp.fromDate(
              dayjs(res.start_date.toDate())
                .set("year", dateInDayjs.get("year"))
                .set("month", dateInDayjs.get("month"))
                .toDate()
            ),
          };
        });
      setRecords(responseWithMonthDate);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMonthExpenses();
  }, [date.getMonth()]);

  return (
    <ExpensesJournalContainer
      style={{ paddingTop: 34, paddingLeft: 32, paddingRight: 32, gap: 42 }}
    >
      <Calendar
        onDateSelected={setDate}
        selectedDate={date}
        expenses={records}
      />
      <Button
        onPress={handleAddNew}
        backgroundColor="#EA5B5F"
        textColor="#000"
        style={{
          text: {
            fontWeight: "bold",
          },
        }}
      >
        Adicionar novo
      </Button>
      <ScrollView
        contentContainerStyle={{
          rowGap: 8,
          paddingBottom: 8,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#EA5B5F" />
        ) : records.length ? (
          dayGotRecord ? (
            records
              .filter((record) =>
                dayjs(record.start_date.toDate()).isSame(date, "date")
              )
              .map((record) => {
                return (
                  <ExpenseJournalRecord key={record.id} expense={record} />
                );
              })
          ) : (
            records.map((record) => {
              return <ExpenseJournalRecord key={record.id} expense={record} />;
            })
          )
        ) : (
          <Text style={{ textAlign: "center" }}>
            Não foram encontradas despesas para esse mês.
          </Text>
        )}
      </ScrollView>
    </ExpensesJournalContainer>
  );
}
