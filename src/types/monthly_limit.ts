import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { AuditFields } from ".";

export type MonthlyLimit = AuditFields & {
  limit: number;
  user: FirebaseFirestoreTypes.DocumentReference;
};
