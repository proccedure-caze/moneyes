import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Expense } from "../types/expense";
import { filterForUniqueDocs, registerDocument } from "../utils";
import dayjs from "dayjs";
import { TABLES } from "../enums/tables";

export async function registerExpense(
  expense: Omit<Expense, "user" | "id" | "created_at" | "updated_at">
) {
  return registerDocument<Expense>(TABLES.EXPENSES, expense, true);
}

export async function getUserExpensesFromMonth(month: number) {
  const currentUser = auth().currentUser;

  if (!currentUser) throw new Error("User not logged in");

  const year = new Date().getFullYear();
  const currentMonthDate = dayjs().year(year).month(month);

  const startOfMonth = currentMonthDate.startOf("month").toDate();
  const endOfMonth = currentMonthDate.endOf("month").add(1, "second").toDate();
  const currentUserRef = firestore().doc(`users/${currentUser.uid}`);

  const response1 = await firestore()
    .collection(TABLES.EXPENSES)
    .where("user", "==", currentUserRef)
    .where("active", "==", true)
    .where("start_date", ">=", startOfMonth)
    .where("start_date", "<", endOfMonth)
    .orderBy("start_date")
    .get();

  const response2 = await firestore()
    .collection(TABLES.EXPENSES)
    .where("user", "==", currentUserRef)
    .where("active", "==", true)
    .where("end_date", ">=", startOfMonth)
    .where("end_date", "<", endOfMonth)
    .orderBy("end_date")
    .orderBy("start_date")
    .get();

  const response3 = await firestore()
    .collection(TABLES.EXPENSES)
    .where("user", "==", currentUserRef)
    .where("active", "==", true)
    .where("recurring", "==", true)
    .where("start_date", "<", startOfMonth)
    .orderBy("start_date")
    .get();

  const data = filterForUniqueDocs<Expense>(response1, response2, response3);

  return data;
}
