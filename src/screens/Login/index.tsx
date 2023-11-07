import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import auth from "@react-native-firebase/auth";
import { z } from "zod";
import { Image, TouchableOpacity } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RouteProps } from "../../types/navigation";
import { Input } from "../../components/Input";
import {
  InputsView,
  LoginContainer,
  LoginContent,
  NotRegisteredButtonText,
  NotRegisteredText,
  SignUpView,
} from "./styles";
import { handleError } from "../../utils/handleError";
import { Button } from "../../components/Button";

const loginSchema = z.object({
  email: z.string({ required_error: "O email é obrigatório." }).email({
    message:
      "Formato de email inválido. Por favor, insira um endereço de email válido.",
  }),
  password: z.string({ required_error: "A senha é obrigatória" }).min(8, {
    message:
      "A senha deve conter no mínimo 8 caracteres. Por favor, insira uma senha válida.",
  }),
});

type Logindata = z.infer<typeof loginSchema>;

export default function Login({ navigation }: RouteProps<"Login">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Logindata>({
    resolver: zodResolver(loginSchema),
  });

  const handleAccountCreate = async (data: Logindata) => {
    try {
      clearErrors();
      await auth().signInWithEmailAndPassword(data.email, data.password);
    } catch (error: any) {
      console.error(error);
      setError("root.login", { message: handleError(error) });
    }
  };

  const redirectToSignUp = () => {
    clearErrors();
    navigation.navigate("SignUp");
  };

  return (
    <LoginContainer>
      <Image
        source={require("../../../assets/moneyes_logo_black.png")}
        style={{
          width: 200,
          height: 200,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <LoginContent>
        <InputsView>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            name="email"
            control={control}
            error={errors.root?.login?.message || errors.email?.message}
          />
          <Input
            placeholder="Senha"
            name="password"
            control={control}
            secureTextEntry={!isPasswordVisible}
            afterIcon={
              isPasswordVisible ? (
                <Feather name="eye-off" color="#000" size={20} />
              ) : (
                <Feather name="eye" color="#000" size={20} />
              )
            }
            onPressAfterIcon={() => setIsPasswordVisible((state) => !state)}
            error={errors.root?.login?.message || errors.password?.message}
          />
        </InputsView>

        <Button
          onPress={handleSubmit(handleAccountCreate)}
          backgroundColor="#EA5B5F"
          textColor="#FFF"
        >
          Enviar
        </Button>

        <SignUpView>
          <NotRegisteredText>Ainda não possui conta?</NotRegisteredText>
          <TouchableOpacity onPress={redirectToSignUp}>
            <NotRegisteredButtonText>Cadastrar-se</NotRegisteredButtonText>
          </TouchableOpacity>
        </SignUpView>
      </LoginContent>
    </LoginContainer>
  );
}
