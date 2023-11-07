import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Expense } from "../types/expense";
import { filterForUniqueDocs, registerDocument } from "../utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { TABLES } from "../enums/tables";
dayjs.extend(utc);

export async function registerExpense(
  expense: Omit<Expense, "user" | "id" | "created_at" | "updated_at">
) {
  return registerDocument<Expense>(TABLES.EXPENSES, expense, true);
}

export async function updateExpense(
  card: Omit<Expense, "user" | "active" | "created_at" | "updated_at">
) {
  const now =
    firestore.FieldValue.serverTimestamp() as unknown as FirebaseFirestoreTypes.Timestamp;
  return firestore()
    .doc(`${TABLES.CARDS}/${card.id!}`)
    .update({
      recurring: card.recurring,
      title: card.title,
      description: card.description,
      amount: card.amount,
      color: card.color,
      start_date: card.start_date,
      end_date: card.end_date,
      updated_at: now,
    });
}

export async function getUserExpensesFromMonthAndYear(
  month: number,
  year: number
) {
  const currentUser = auth().currentUser;

  if (!currentUser) throw new Error("User not logged in");

  const currentMonthDate = dayjs()
    .year(year)
    .month(month)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);

  const startOfMonth = currentMonthDate.date(0).toDate();
  const endOfMonth = currentMonthDate
    .date(31)
    .hour(24)
    .minute(59)
    .second(59)
    .add(1, "second")
    .toDate();

  const currentUserRef = firestore().doc(`${TABLES.USERS}/${currentUser.uid}`);

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

export async function getUserExpenseById(id: string) {
  const currentUserRef = firestore().doc(`${TABLES.EXPENSES}/${id}`);

  const response = await currentUserRef.get();

  return response.data() as Expense;
}
