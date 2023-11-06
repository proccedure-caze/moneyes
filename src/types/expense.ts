import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { AuditFields } from ".";

export type Expense = AuditFields & {
  recurring: boolean;
  title: string;
  description: string;
  amount: number;
  color: string;
  start_date: FirebaseFirestoreTypes.Timestamp;
  end_date: FirebaseFirestoreTypes.Timestamp | null;
  user: FirebaseFirestoreTypes.DocumentReference | null;
};
