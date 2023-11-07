import { Text, View, Platform, StyleSheet } from "react-native";
import {
  ScreenDescription,
  ScreenTitle,
  UnderlinedText,
  WallerContainer,
} from "./styles";
import { Button } from "../../components/Button";
import { ListCards } from "../../components/ListCards";
import { useEffect, useState } from "react";
import { RouteProps } from "../../types/navigation";
import { getUserCards } from "../../services/cards";
import { Card } from "../../types/card";
import { formatBRL } from "../../utils";

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

export default function Wallet({ navigation }: RouteProps<"Carteira">) {
  const [cards, setCards] = useState<Card[]>([]);
  const monthlyLimit = cards.reduce((accumulator, current) => {
    return accumulator + current.limit;
  }, 0);

  const redirectToRegisterCards = () => navigation.navigate("RegisterCards");

  const fetchCards = async () => {
    try {
      const cards = await getUserCards();

      setCards(cards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <WallerContainer>
      <ScreenTitle>Altere seu limite adicionando cartões.</ScreenTitle>

      <View style={{ gap: 8 }}>
        <Button
          backgroundColor="#EA5B5F"
          textColor="#000"
          onPress={redirectToRegisterCards}
        >
          Cadastre seus cartões
        </Button>
        <ListCards cards={cards} />
      </View>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <ScreenDescription style={styles.shadow}>
          Seu limite atual é de:
          <UnderlinedText>{formatBRL(monthlyLimit)}</UnderlinedText>
        </ScreenDescription>
      </View>
    </WallerContainer>
  );
}
