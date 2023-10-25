import { ReactNode } from "react";
import { ThemeProvider } from "styled-components/native";
import { defaultTheme } from "../theme";
import { NavigationContainer } from "@react-navigation/native";

type Providers = {
  children: ReactNode;
};

export function Providers({ children }: Providers) {
  return (
    <>
      <NavigationContainer>
        <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
      </NavigationContainer>
    </>
  );
}
