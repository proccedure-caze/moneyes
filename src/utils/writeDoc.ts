import firestore from "@react-native-firebase/firestore";
import uuid from "react-native-uuid";
import { TABLES } from "../enums/tables";

export async function addDocumentToFirestoreAndUpdateId(
  table: TABLES,
  data: {
    [key: string | number]: any;
  }
): Promise<any> {
  return new Promise((res, rej) => {
    try {
      const dataId = data.id ?? `temp-id-${uuid.v4()}`;
      const store = firestore();
      const collectionRef = store.collection(table);
      const queries = collectionRef.where("id", "==", dataId);

      collectionRef.add({
        ...data,
        id: dataId,
      });

      const unsubscribeCreate = queries.onSnapshot((querySnapshot) => {
        const doc = querySnapshot.docs[0];
        store.doc(doc.ref.path).update({ ...data, id: doc.id });

        const queries = collectionRef.where("id", "==", doc.id);
        unsubscribeCreate();
        const unsubscribeUpdate = queries.onSnapshot((querySnapshot) => {
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
