import { createUserWithEmailAndPassword as createUserWithEmailAndPasswordOnAuth } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase.config";
import { addDocumentToFirestoreAndUpdateId } from "../utils";
import { TABLES } from "../enums";

export async function createUserOnAuthAndFirestore(
  email: string,
  password: string
) {
  await createUserWithEmailAndPasswordOnAuth(FIREBASE_AUTH, email, password);
  await addDocumentToFirestoreAndUpdateId(TABLES.USERS, { email, password });
}
