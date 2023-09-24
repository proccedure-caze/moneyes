import { initializeApp } from "firebase/app";
import type { FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAX7PIhnMRgsEjOuLvReHZy_qW9INURfK4",
  authDomain: "moneyes-2600a.firebaseapp.com",
  projectId: "moneyes-2600a",
  storageBucket: "moneyes-2600a.appspot.com",
  messagingSenderId: "799945577014",
  appId: "1:799945577014:web:c26e5ffe88461d60eabe97",
  measurementId: "G-X8YQB6DQPX",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
