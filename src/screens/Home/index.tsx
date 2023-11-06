import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import {
  CardAmount,
  CardContent,
  CardContentRightView,
  CardDescription,
  CardsSectionTitle,
  CardsSectionView,
  CardsView,
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
  LiquidAnimationContainer,
  LiquidAnimationPercentage,
  MainContent,
  MostRightButtons,
  RedFill,
  UpdateCard,
} from "./styles";
import { getUserExpensesFromMonth } from "../../services/expenses";
import { formatBRL } from "../../utils";
import dayjs from "dayjs";
import { getUserMonthlyLimit } from "../../services/monthly_limits";
import { z } from "zod";

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});

const _MAIN_CONTENT_INITIAL_STATE = z.object({
  loading: z.boolean().default(true),
  monthly_limit: z.number().default(0),
  current_expense: z.number().default(0),
});

type MainContentType = z.infer<typeof _MAIN_CONTENT_INITIAL_STATE>;

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mainContent, setMainContent] = useState<MainContentType>(
    _MAIN_CONTENT_INITIAL_STATE.parse({})
  );

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  const getMonthExpenses = async () => {
    try {
      const now = dayjs();
      setMainContent(_MAIN_CONTENT_INITIAL_STATE.parse({}));
      const response = await getUserExpensesFromMonth(now.get("month"));
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
      const [monthlyLimit] = await getUserMonthlyLimit();

      setMainContent({
        loading: false,
        monthly_limit: monthlyLimit.limit,
        current_expense: totalAmount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMonthExpenses();
  }, []);

  const pencentage = Math.round(
    (mainContent.current_expense / mainContent.monthly_limit) * 100
  );

  return (
    <HomeContainer>
      <ScrollView style={{ flex: 1 }}>
        <HeaderButtonsView>
          <Button>
            <SimpleLineIcons name="options" color="#000000" size={24} />
          </Button>
          <MostRightButtons>
            <Button>
              <Feather name="bell" color="#000000" size={24} />
            </Button>
          </MostRightButtons>
        </HeaderButtonsView>

        <HomeContent>
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
          <ExpensesHistoryView>
            <Button
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
            <CardsView>
              <CardContent>
                <Image source={require("../../../assets/Card.png")} />
                <CardContentRightView>
                  <View>
                    <CardAmount>R$ 10.0000</CardAmount>
                    <CardDescription>Seu dinheiro</CardDescription>
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <UpdateCard>Alterar valor</UpdateCard>
                    <Feather name="chevron-right" color="#000" size={24} />
                  </TouchableOpacity>
                </CardContentRightView>
              </CardContent>
              <CardContent>
                <Image source={require("../../../assets/Card.png")} />
                <CardContentRightView>
                  <View>
                    <CardAmount>R$ 10.0000</CardAmount>
                    <CardDescription>Seu dinheiro</CardDescription>
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <UpdateCard>Alterar valor</UpdateCard>
                    <Feather name="chevron-right" color="#000" size={24} />
                  </TouchableOpacity>
                </CardContentRightView>
              </CardContent>
              <CardContent>
                <Image source={require("../../../assets/Card.png")} />
                <CardContentRightView>
                  <View>
                    <CardAmount>R$ 10.0000</CardAmount>
                    <CardDescription>Seu dinheiro</CardDescription>
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <UpdateCard>Alterar valor</UpdateCard>
                    <Feather name="chevron-right" color="#000" size={24} />
                  </TouchableOpacity>
                </CardContentRightView>
              </CardContent>
              <CardContent>
                <Image source={require("../../../assets/Card.png")} />
                <CardContentRightView>
                  <View>
                    <CardAmount>R$ 10.0000</CardAmount>
                    <CardDescription>Seu dinheiro</CardDescription>
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <UpdateCard>Alterar valor</UpdateCard>
                    <Feather name="chevron-right" color="#000" size={24} />
                  </TouchableOpacity>
                </CardContentRightView>
              </CardContent>
            </CardsView>
            <Button
              textColor="#EA5B5F"
              style={{
                text: {
                  fontWeight: "bold",
                },
              }}
            >
              Adicionar cartões
            </Button>
          </CardsSectionView>
        </HomeContent>
      </ScrollView>
    </HomeContainer>
  );
}
