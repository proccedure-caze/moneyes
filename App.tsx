import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase.config";
import Home from "./app/screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const subscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setLoggedIn(!!user);
    });

    return subscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!loggedIn ? (
          <>
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
