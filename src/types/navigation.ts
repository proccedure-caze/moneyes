import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RoutesParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  ExpensesJournal: undefined;
  RegisterExpenses: undefined;
};

type routesNames = keyof RoutesParamList;

export type RouteProps<T extends routesNames> = {
  navigation: NativeStackNavigationProp<RoutesParamList, T>;
};
