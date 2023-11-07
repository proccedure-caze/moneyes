import { Image, View, TouchableOpacity, Text } from "react-native";
import {
  CardAmount,
  CardContent,
  CardContentRightView,
  CardDescription,
  CardsView,
  UpdateCard,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { Card } from "../../types/card";
import { formatBRL } from "../../utils";
import { useNavigation } from "@react-navigation/native";

type ListCardsProps = {
  cards: Card[];
};

export function ListCards({ cards = [] }: ListCardsProps) {
  const navigation = useNavigation();

  const handleEditCard = (id: string) => {
    navigation.navigate("RegisterCards", { id });
  };

  return (
    <CardsView>
      {cards.length ? (
        cards.map((card) => {
          return (
            <CardContent key={card.id}>
              <Image source={require("../../../assets/Card.png")} />
              <CardContentRightView>
                <View style={{ width: 120 }}>
                  <CardAmount numberOfLines={1} ellipsizeMode="tail">
                    {formatBRL(card.limit)}
                  </CardAmount>
                  <CardDescription numberOfLines={1} ellipsizeMode="tail">
                    {card.title}
                  </CardDescription>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                  }}
                  onPress={() => handleEditCard(card.id!)}
                >
                  <UpdateCard>Alterar valor</UpdateCard>
                  <Feather name="chevron-right" color="#000" size={24} />
                </TouchableOpacity>
              </CardContentRightView>
            </CardContent>
          );
        })
      ) : (
        <Text style={{ textAlign: "center", backgroundColor: "#F7F7F7" }}>
          Você ainda não possui nenhum cartão cadastrado.
        </Text>
      )}
    </CardsView>
  );
}
