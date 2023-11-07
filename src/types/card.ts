import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { AuditFields } from ".";

export type Card = AuditFields & {
  limit: number;
  title: string;
  user: FirebaseFirestoreTypes.DocumentReference;
};
