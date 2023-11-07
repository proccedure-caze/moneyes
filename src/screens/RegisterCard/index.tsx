import { View, Text, ActivityIndicator } from "react-native";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import { RegisterCardContainer } from "./styles";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/Button";
import { RouteProps } from "../../types/navigation";
import {
  getUserCardById,
  registerCard,
  updateCard,
} from "../../services/cards";
import { useEffect, useState } from "react";

const cardSchema = z.object({
  limit: z.number(),
  title: z.string(),
});

type cardData = z.infer<typeof cardSchema>;

export function RegisterCard({ navigation }: RouteProps<"RegisterCards">) {
  const [edition, setEdition] = useState(false);
  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
  } = useForm<cardData>({
    resolver: zodResolver(cardSchema),
  });

  const route = useRoute();
  const params = route.params;

  const registerNewExpense = async (data: cardData) => {
    try {
      const formattedText = String(data.limit).replace(",", ".");
      const cents = Math.round(parseFloat(formattedText) * 100);

      if (edition) {
        await updateCard({ id: params?.id, limit: cents, title: data.title });
      } else {
        await registerCard({
          title: data.title,
          limit: cents,
          active: true,
        });
      }

      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const getCardById = async () => {
    try {
      const card = await getUserCardById(params?.id);
      setEdition(true);
      setValue("limit", card.limit / 100);
      setValue("title", card.title);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params) getCardById();
  }, []);

  return (
    <RegisterCardContainer>
      <Header
        title={`${edition ? "Editar" : "Registrar"} cartão`}
        disabled={isSubmitting}
      />
      <Input
        placeholder="Nome pro seu cartão"
        name="title"
        control={control}
        error={errors.title?.message}
      />
      <Input
        placeholder="Valor"
        name="limit"
        control={control}
        error={errors.limit?.message}
        amount
      />
      <View>
        {Object.keys(errors).length > 0 && (
          <Text style={{ color: "#EA5B5F" }}>
            Preecha os campos corretamente e tente denovo!
          </Text>
        )}
        <Button
          backgroundColor="#EA5B5F"
          textColor="#000"
          onPress={handleSubmit(registerNewExpense)}
          disabled={isSubmitting || Object.keys(errors).length > 0}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#000" />
          ) : edition ? (
            "Editar"
          ) : (
            "Cadastrar"
          )}
        </Button>
      </View>
    </RegisterCardContainer>
  );
}
