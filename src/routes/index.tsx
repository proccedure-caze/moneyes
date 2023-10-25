import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [loggedUser, setLoggedUser] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log(user);
      setLoggedUser(!!user);
    });
    return subscriber;
  }, []);

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!loggedUser ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
