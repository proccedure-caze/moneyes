import { useForm } from "react-hook-form";
import { View, Text, TouchableOpacity } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../../components/Input";
import Feather from "@expo/vector-icons/Feather";
import { Box } from "../../components/Box";
import { useState } from "react";
import { createUserOnAuthAndFirestore } from "../../services/users";
import { Button } from "../../components/Button";
import { handleError } from "../../utils/handleError";
import { Header } from "../../components/Header";
import { InputsContainer, SignUpContainer, SignUpContent } from "./styles";

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signUpSchema = z
  .object({
    email: z.string({ required_error: "O email é obrigatório." }).email({
      message:
        "Formato de email inválido. Por favor, insira um endereço de email válido.",
    }),
    password: z
      .string({ required_error: "A senha é obrigatória" })
      .min(8, {
        message:
          "A senha deve conter no mínimo 8 caracteres. Por favor, insira uma senha válida.",
      })
      .regex(strongPasswordRegex, {
        message:
          "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito numérico e um caractere especial (@$!%*?&). Por favor, insira uma senha forte.",
      }),
    confirm_password: z
      .string({ required_error: "A senha é obrigatória" })
      .min(8, {
        message:
          "A senha deve conter no mínimo 8 caracteres. Por favor, insira uma senha válida.",
      })
      .regex(strongPasswordRegex, {
        message:
          "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito numérico e um caractere especial (@$!%*?&). Por favor, insira uma senha forte.",
      }),
  })
  .refine(
    (values) =>
      values.password &&
      values.confirm_password &&
      values.password === values.confirm_password,
    {
      message: "As senhas não coincidem.",
      path: ["confirm_password"],
    }
  );

type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    try {
      await createUserOnAuthAndFirestore(data.email, data.password);
    } catch (error) {
      console.error(error);
      setError("root.signup", { message: handleError(error) });
    }
  };

  return (
    <SignUpContainer>
      <Header title="Cadastro" />
      <SignUpContent>
        <InputsContainer>
          <Input
            control={control}
            name="email"
            placeholder="Email"
            error={errors.email?.message}
          />
          <Input
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry={!isPasswordVisible}
            afterIcon={
              isPasswordVisible ? (
                <Feather name="eye-off" color="#000" size={20} />
              ) : (
                <Feather name="eye" color="#000" size={20} />
              )
            }
            onPressAfterIcon={() => setIsPasswordVisible((state) => !state)}
            error={errors.password?.message}
          />
          <Input
            control={control}
            name="confirm_password"
            placeholder="Confirme sua senha"
            secureTextEntry={!isConfirmPasswordVisible}
            afterIcon={
              isConfirmPasswordVisible ? (
                <Feather name="eye-off" color="#000" size={20} />
              ) : (
                <Feather name="eye" color="#000" size={20} />
              )
            }
            onPressAfterIcon={() =>
              setIsConfirmPasswordVisible((state) => !state)
            }
            error={errors.confirm_password?.message}
          />
        </InputsContainer>
        <Button
          text="Cadastrar"
          onPress={handleSubmit(onSubmit)}
          backgroundColor="#EA5B5F"
          textColor="#FFF"
        />
      </SignUpContent>
    </SignUpContainer>
  );
}
