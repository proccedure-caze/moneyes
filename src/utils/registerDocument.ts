import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { TABLES } from "../enums/tables";

export async function registerDocument<T>(
  collectionName: TABLES,
  documentData: Omit<T, "id" | "user" | "created_at" | "updated_at">,
  addUserReference?: boolean
): Promise<T> {
  const now =
    firestore.FieldValue.serverTimestamp() as unknown as FirebaseFirestoreTypes.Timestamp;
  const currentUser = auth().currentUser;

  const newDocRef = await firestore()
    .collection(collectionName)
    .add(documentData);

  const updateData: any = {
    id: newDocRef.id,
    created_at: now,
    updated_at: now,
  };

  if (addUserReference) {
    if (!currentUser) throw new Error("User not logged in");
    updateData.user = firestore().doc(
      `${TABLES.USERS}/${currentUser.uid}`
    ) as any;
  }

  await newDocRef.update(updateData);

  return {
    ...documentData,
    ...updateData,
  } as T;
}
