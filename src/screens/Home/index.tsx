import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Platform,
  Image,
} from "react-native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { z } from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { Button } from "../../components/Button";
import {
  CardsSectionTitle,
  CardsSectionView,
  CircleContainer,
  ExpenseAmount,
  ExpenseContainer,
  ExpenseContent,
  ExpenseTitle,
  ExpensesHistoryView,
  ExpensesView,
  HeaderButtonsView,
  HomeContainer,
  HomeContent,
  LiquidAnimationPercentage,
  MainContent,
  MostRightButtons,
  RedFill,
} from "./styles";
import { getUserExpensesFromMonthAndYear } from "../../services/expenses";
import { formatBRL } from "../../utils";
import { RouteProps } from "../../types/navigation";
import { ListCards } from "../../components/ListCards";
import { getUserCards } from "../../services/cards";
import { Card } from "../../types/card";

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

const _MAIN_CONTENT_INITIAL_STATE = z.object({
  loading: z.boolean().default(true),
  monthly_limit: z.number().default(0),
  current_expense: z.number().default(0),
});

type MainContentType = z.infer<typeof _MAIN_CONTENT_INITIAL_STATE>;

export default function Home({ navigation }: RouteProps<"Home">) {
  const [cards, setCards] = useState<Card[]>([]);
  const [noLimitRegistered, setNolimitRegistered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mainContent, setMainContent] = useState<MainContentType>(
    _MAIN_CONTENT_INITIAL_STATE.parse({})
  );

  const pencentage = Math.round(
    (mainContent.current_expense / mainContent.monthly_limit) * 100
  );

  const redirectToWallet = () => navigation.navigate("Carteira");
  const redirectToExpenses = () => navigation.navigate("Despesas");
  const redirectToCardRegistration = () => navigation.navigate("RegisterCards");

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  const logout = async () => await auth().signOut();

  const getMonthExpenses = async () => {
    try {
      const now = dayjs();
      setMainContent(_MAIN_CONTENT_INITIAL_STATE.parse({}));
      const response = await getUserExpensesFromMonthAndYear(
        now.get("month"),
        now.get("year")
      );
      const totalAmount = response
        .filter((res) => {
          if (res.recurring === true) return true;

          return dayjs(res.start_date.toDate())
            .set("year", now.get("year"))
            .set("month", now.get("month"))
            .isBefore(res.end_date?.toDate());
        })
        .reduce((accumulator, current) => {
          return accumulator + current.amount;
        }, 0);
      const cards = await getUserCards();
      setCards(cards);
      const monthlyLimit = cards.reduce((accumulator, current) => {
        return accumulator + current.limit;
      }, 0);

      if (!monthlyLimit) {
        setNolimitRegistered(true);
        await AsyncStorage.setItem("no_limit", "true");
      } else {
        await AsyncStorage.setItem("no_limit", "false");
      }

      SplashScreen.hideAsync();

      setMainContent({
        loading: false,
        monthly_limit: monthlyLimit,
        current_expense: totalAmount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMonthExpenses();
  }, []);

  return (
    <HomeContainer>
      <ScrollView style={{ flex: 1 }}>
        <HeaderButtonsView>
          <Image
            source={require("../../../assets/moneyes_logo.png")}
            style={{
              width: 48,
              height: 48,
            }}
          />
          <MostRightButtons>
            <Button onPress={logout}>
              <SimpleLineIcons name="logout" color="#000000" size={24} />
            </Button>
          </MostRightButtons>
        </HeaderButtonsView>

        <HomeContent>
          {noLimitRegistered ? (
            <View style={{ marginVertical: 16, gap: 8 }}>
              <Text>Você ainda não cadastrou um limite.</Text>
              <Button
                backgroundColor="#EA5B5F"
                onPress={redirectToWallet}
                style={{
                  text: {
                    fontWeight: "bold",
                  },
                }}
              >
                Cadastrar agora!
              </Button>
            </View>
          ) : (
            <MainContent>
              <CircleContainer style={styles.shadow}>
                <RedFill percentage={pencentage} />

                <LiquidAnimationPercentage
                  onLayout={onLayout}
                  style={{
                    transform: [
                      { translateX: -dimensions.width / 2 },
                      { translateY: -dimensions.height / 2 },
                    ],
                  }}
                >
                  {mainContent.loading ? (
                    <ActivityIndicator size="small" color="#EA5B5F" />
                  ) : (
                    `${pencentage}%`
                  )}
                </LiquidAnimationPercentage>
              </CircleContainer>

              <ExpensesView>
                <ExpenseContainer>
                  <ExpenseTitle>Seus gastos</ExpenseTitle>
                  <ExpenseContent>
                    <ExpenseAmount>
                      {mainContent.loading ? (
                        <ActivityIndicator size="small" color="#EA5B5F" />
                      ) : (
                        formatBRL(mainContent.current_expense)
                      )}
                    </ExpenseAmount>
                  </ExpenseContent>
                </ExpenseContainer>

                <ExpenseContainer
                  style={{
                    paddingTop: 12,
                    borderTopColor: "#A0A0AF",
                    borderTopWidth: 1,
                  }}
                >
                  <ExpenseTitle>Seu limite mensal</ExpenseTitle>
                  <ExpenseContent>
                    <ExpenseAmount>
                      {mainContent.loading ? (
                        <ActivityIndicator size="small" color="#EA5B5F" />
                      ) : (
                        formatBRL(mainContent.monthly_limit)
                      )}
                    </ExpenseAmount>
                  </ExpenseContent>
                </ExpenseContainer>
              </ExpensesView>
            </MainContent>
          )}
          <ExpensesHistoryView>
            <Button
              onPress={redirectToExpenses}
              backgroundColor="#EA5B5F"
              style={{
                text: {
                  fontWeight: "bold",
                },
              }}
            >
              Seus gastos
            </Button>
          </ExpensesHistoryView>
          <CardsSectionView>
            <CardsSectionTitle>Cartões</CardsSectionTitle>
            <ListCards cards={cards} />
            <Button
              textColor="#EA5B5F"
              style={{
                text: {
                  fontWeight: "bold",
                },
              }}
              onPress={redirectToCardRegistration}
            >
              Adicionar cartões
            </Button>
          </CardsSectionView>
        </HomeContent>
      </ScrollView>
    </HomeContainer>
  );
}
