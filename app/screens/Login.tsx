import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { createUserOnAuthAndFirestore } from "../services/users";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAccountCreate = async () => {
    if (email && password) {
      await createUserOnAuthAndFirestore(email, password);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Enviar" onPress={handleAccountCreate} />
    </View>
  );
}
