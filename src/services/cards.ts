import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { TABLES } from "../enums/tables";
import { Card } from "../types/card";
import { registerDocument } from "../utils";

export async function registerCard(
  expense: Omit<Card, "user" | "id" | "created_at" | "updated_at">
) {
  return registerDocument<Card>(TABLES.CARDS, expense, true);
}

export async function getUserCards() {
  const currentUser = auth().currentUser;

  if (!currentUser) throw new Error("User not logged in");

  const currentUserRef = firestore().doc(`${TABLES.USERS}/${currentUser.uid}`);

  const response = await firestore()
    .collection(TABLES.CARDS)
    .where("user", "==", currentUserRef)
    .where("active", "==", true)
    .orderBy("updated_at", "desc")
    .get();

  const data = response.docs.map((doc) => doc.data());

  return data as Card[];
}

export async function updateCard(
  card: Omit<Card, "user" | "active" | "created_at" | "updated_at">
) {
  const now =
    firestore.FieldValue.serverTimestamp() as unknown as FirebaseFirestoreTypes.Timestamp;
  return firestore()
    .doc(`${TABLES.CARDS}/${card.id!}`)
    .update({ limit: card.limit, title: card.title, updated_at: now });
}

export async function getUserCardById(id: string) {
  const currentUserRef = firestore().doc(`${TABLES.CARDS}/${id}`);

  const response = await currentUserRef.get();

  return response.data() as Card;
}
