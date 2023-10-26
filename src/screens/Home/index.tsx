import { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

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
              <RedFill percentage={50} />

              <LiquidAnimationPercentage
                onLayout={onLayout}
                style={{
                  transform: [
                    { translateX: -dimensions.width / 2 },
                    { translateY: -dimensions.height / 2 },
                  ],
                }}
              >
                50%
              </LiquidAnimationPercentage>
            </CircleContainer>

            <ExpensesView>
              <ExpenseContainer>
                <ExpenseTitle>Seus gastos</ExpenseTitle>
                <ExpenseContent>
                  <ExpenseAmount>R$ 2500,00</ExpenseAmount>
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
                  <ExpenseAmount>R$ 5000,00</ExpenseAmount>
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
