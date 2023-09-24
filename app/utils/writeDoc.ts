import {
  CollectionReference,
  DocumentData,
  onSnapshot,
  query,
  updateDoc,
  addDoc,
  where,
  collection,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase.config";
import { TABLES } from "../enums/tables";

export async function addDocumentToFirestoreAndUpdateId(
  table: TABLES,
  data: {
    [key: string | number]: any;
  }
): Promise<any> {
  return new Promise((res, rej) => {
    try {
      const collectionRef = collection(FIREBASE_DB, table);
      const queries = query(collectionRef, where("id", "==", data.id));

      addDoc(collectionRef, { id: `temp-id-${crypto.randomUUID()}`, ...data });

      const unsubscribeCreate = onSnapshot(queries, (querySnapshot) => {
        const doc = querySnapshot.docs[0];
        updateDoc(doc.ref, { ...data, id: doc.id });
        const queries = query(collectionRef, where("id", "==", doc.id));

        unsubscribeCreate();
        const unsubscribeUpdate = onSnapshot(queries, (querySnapshot) => {
          const doc = querySnapshot.docs[0].data();

          unsubscribeUpdate();

          res(doc);
        });
      });
    } catch (e) {
      rej(e);
    }
  });
}
