import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { Calendar } from "../../components/Calendar";
import { ExpenseJournalRecord } from "../../components/ExpenseJournalRecord";
import {
  ExpensesJournalContainer,
  ScreenDescription,
  UnderlinedText,
} from "./styles";
import { Button } from "../../components/Button";
import { RouteProps } from "../../types/navigation";
import { getUserExpensesFromMonthAndYear } from "../../services/expenses";
import { Expense } from "../../types/expense";
import { formatBRL } from "../../utils";
dayjs.extend(utc);

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

export default function ExpensesJournal({
  navigation,
}: RouteProps<"Despesas">) {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [records, setRecords] = useState<Expense[]>([]);
  const total = records.reduce((acc, record) => {
    return acc + record.amount;
  }, 0);

  const dayGotRecord = records.some((record) =>
    dayjs(record.start_date.toDate()).isSame(date, "date")
  );

  const handleAddNew = () => navigation.push("RegisterExpenses");

  const getMonthExpenses = async () => {
    try {
      setLoading(true);
      setRecords([]);
      const dateInDayjs = dayjs(date).hour(0).minute(0).second(0);
      const response = await getUserExpensesFromMonthAndYear(
        dateInDayjs.get("month"),
        dateInDayjs.get("year")
      );
      const responseWithMonthDate = response
        .filter((res) => {
          if (res.recurring === true) return true;

          const dayWithMonthAndYear = dayjs(res.start_date.toDate())
            .set("year", dateInDayjs.get("year"))
            .set("month", dateInDayjs.get("month"));
          const condition1 = dayWithMonthAndYear.isBefore(
            res.end_date?.toDate(),
            "month"
          );
          const condition2 = dayWithMonthAndYear.isSame(
            res.end_date?.toDate(),
            "month"
          );

          return condition1 || condition2;
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
        style={{
          maxHeight: 180,
        }}
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
      {!loading && records.length ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <ScreenDescription style={styles.shadow}>
            Total: <UnderlinedText>{formatBRL(total)}</UnderlinedText>
          </ScreenDescription>
        </View>
      ) : (
        <></>
      )}
    </ExpensesJournalContainer>
  );
}
