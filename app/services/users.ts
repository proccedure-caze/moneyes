import auth from "@react-native-firebase/auth";
import { addDocumentToFirestoreAndUpdateId } from "../utils";
import { TABLES } from "../enums";

export async function createUserOnAuthAndFirestore(
  email: string,
  password: string
) {
  await auth().createUserWithEmailAndPassword(email, password);
  await addDocumentToFirestoreAndUpdateId(TABLES.USERS, { email });
}
