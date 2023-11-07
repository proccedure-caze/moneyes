import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RoutesParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Carteira: undefined;
  Despesas: undefined;
  RegisterExpenses?: {
    id?: string;
  };
  RegisterCards?: {
    id?: string;
  };
};

type routesNames = keyof RoutesParamList;

export type RouteProps<T extends routesNames> = {
  navigation: NativeStackNavigationProp<RoutesParamList, T>;
};
