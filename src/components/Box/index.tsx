import { ReactNode } from "react";
import { Text } from "react-native";

type Box = {
  children: ReactNode;
};

export function Box({ children }: Box) {
  return <Text>{children}</Text>;
}
