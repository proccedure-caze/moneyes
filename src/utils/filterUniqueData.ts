import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function filterForUniqueDocs<T = any>(
  ...snapshots: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>[]
) {
  const seenIds = new Set<string>();
  const uniqueData: T[] = [];

  snapshots.forEach((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if (!seenIds.has(doc.id)) {
        seenIds.add(doc.id);
        uniqueData.push(doc.data() as T);
      }
    });
  });

  return uniqueData;
}
