import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import auth from "@react-native-firebase/auth";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import Wallet from "../screens/Wallet";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="house-user"
              color={focused ? "#EA5B5FC2" : "#000000"}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Carteira"
        component={Wallet}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="wallet"
              color={focused ? "#EA5B5FC2" : "#000000"}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const [loggedUser, setLoggedUser] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setLoggedUser(!!user);
    });
    return subscriber;
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!loggedUser ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        <>
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
        </>
      )}
    </Stack.Navigator>
  );
}
