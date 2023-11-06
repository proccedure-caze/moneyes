import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { TABLES } from "../enums/tables";
import { MonthlyLimit } from "../types/monthly_limit";

export async function getUserMonthlyLimit() {
  const currentUser = auth().currentUser;

  if (!currentUser) throw new Error("User not logged in");

  const currentUserRef = firestore().doc(`users/${currentUser.uid}`);

  const response = await firestore()
    .collection(TABLES.MONTHLY_LIMITS)
    .where("user", "==", currentUserRef)
    .where("active", "==", true)
    .orderBy("updated_at", "desc")
    .get();

  const data = response.docs.map((doc) => doc.data());

  return data as MonthlyLimit[];
}
