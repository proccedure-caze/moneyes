import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import Home from "./app/screens/Home";
import { NativeWindStyleSheet } from "nativewind";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
        });

      openAppFromQuitState();
      openAppFromBackgroundState();
    }
  };

  const openAppFromQuitState = async () => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused the app to open from quit state:",
            remoteMessage.notification
          );
        }
      });
  };
  const openAppFromBackgroundState = async () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused the app to open from background state:",
        remoteMessage.notification
      );
    });
  };

  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged((user) => {
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
