import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import DatePicker from "react-native-date-picker";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ColorPicker from "react-native-wheel-color-picker";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Header } from "../../components/Header";
import { RouteProps } from "../../types/navigation";
import {
  getUserExpenseById,
  registerExpense,
  updateExpense,
} from "../../services/expenses";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { RegisterExpensesContainer } from "./styles";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
dayjs.extend(utc);

const expenseSchema = z.object({
  amount: z.number(),
  start_date: z.date(),
  end_date: z.date().nullable(),
  title: z.string(),
  description: z.string(),
  recurring: z.boolean(),
  color: z.string(),
});

type expenseData = z.infer<typeof expenseSchema>;

export default function RegisterExpenses({
  navigation,
}: RouteProps<"RegisterExpenses">) {
  const [edition, setEdition] = useState(false);

  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
    watch,
  } = useForm<expenseData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      start_date: new Date(),
      end_date: new Date(),
      recurring: false,
    },
  });

  const recurring = watch("recurring");

  const route = useRoute();
  const params = route.params;

  const registerNewExpense = async (data: expenseData) => {
    try {
      const formattedText = String(data.amount).replace(",", ".");
      const cents = Math.round(parseFloat(formattedText) * 100);

      const start_date = firestore.Timestamp.fromDate(
        dayjs(data.start_date).hour(0).minute(0).millisecond(0).toDate()
      );
      const end_date = data.recurring
        ? null
        : firestore.Timestamp.fromDate(
            dayjs(data.end_date).hour(0).minute(0).millisecond(0).toDate()
          );
      if (edition) {
        await updateExpense({
          id: params?.id,
          title: data.title,
          description: data.description,
          color: data.color,
          amount: cents,
          recurring: data.recurring,
          start_date,
          end_date,
        });
      } else {
        await registerExpense({
          title: data.title,
          description: data.description,
          color: data.color,
          amount: cents,
          recurring: data.recurring,
          start_date,
          end_date,
          active: true,
        });
      }

      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const getExpenseById = async () => {
    try {
      const expense = await getUserExpenseById(params?.id);
      setEdition(true);
      setValue("amount", expense.amount / 100);
      setValue("color", expense.color);
      setValue("description", expense.description);
      setValue(
        "end_date",
        expense.end_date ? expense.end_date?.toDate() : new Date()
      );
      setValue("recurring", expense.recurring);
      setValue("start_date", expense.start_date.toDate());
      setValue("title", expense.title);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params) getExpenseById();
  }, []);

  return (
    <RegisterExpensesContainer>
      <Header
        title={`${edition ? "Editar" : "Registrar"} Despesa`}
        disabled={isSubmitting}
      />
      <View style={{ flex: 1, padding: 20 }}>
        <ScrollView contentContainerStyle={{ gap: 30 }}>
          <View style={{ gap: 8 }}>
            <Input
              placeholder="Nome da despesa"
              name="title"
              control={control}
              error={errors.title?.message}
            />

            <Textarea
              placeholder="Descrição"
              name="description"
              control={control}
              error={errors.title?.message}
            />

            <Input
              placeholder="Valor"
              name="amount"
              control={control}
              error={errors.amount?.message}
              amount
            />
          </View>

          <Text>Cor do marcador</Text>

          <Controller
            control={control}
            name="color"
            render={({ field: { value, onChange, ref } }) => {
              return (
                <ColorPicker
                  ref={ref}
                  color={value}
                  onColorChange={onChange}
                  thumbSize={30}
                  sliderSize={20}
                  swatches={false}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="recurring"
            render={({ field: { onChange, value } }) => {
              return (
                <ToggleSwitch
                  toggleSwitch={() => onChange(!value)}
                  isEnabled={value}
                  title="Recorrente"
                />
              );
            }}
          />

          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text>Data de Início</Text>
            <Controller
              control={control}
              name="start_date"
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    date={value}
                    onDateChange={onChange}
                    mode="date"
                    style={{
                      backgroundColor: "#F7F7F7",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                );
              }}
            />
          </View>

          {!recurring && (
            <View style={{ flexDirection: "column", gap: 8 }}>
              <Text>Data de Término</Text>

              <Controller
                control={control}
                name="end_date"
                render={({ field: { onChange, value } }) => {
                  return (
                    <DatePicker
                      date={value!}
                      onDateChange={onChange}
                      mode="date"
                      style={{
                        backgroundColor: "#F7F7F7",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                  );
                }}
              />
            </View>
          )}

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
        </ScrollView>
      </View>
    </RegisterExpensesContainer>
  );
}
