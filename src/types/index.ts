import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type AuditFields = {
  id: string | null;
  active: boolean;
  created_at: FirebaseFirestoreTypes.Timestamp;
  updated_at: FirebaseFirestoreTypes.Timestamp;
};
