import { RoutesParamList } from "../types/navigation";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RoutesParamList {}
  }
}
