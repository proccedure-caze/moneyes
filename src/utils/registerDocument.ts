import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { TABLES } from "../enums/tables";

export async function registerDocument<
  T extends {
    id?: string | null;
    user?: FirebaseFirestoreTypes.DocumentReference | null;
  }
>(collectionName: TABLES, documentData: T, addUserReference?: boolean) {
  const newDocRef = await firestore()
    .collection(collectionName)
    .add(documentData as any);

  const updateData: Partial<T> = {
    id: newDocRef.id,
  } as T;

  if (addUserReference) {
    const currentUser = auth().currentUser;
    if (currentUser) {
      updateData.user = firestore().doc(`users/${currentUser.uid}`);
    }
  }

  await newDocRef.update(updateData);
}
