import { useEffect } from "react";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { useFonts, Inter_700Bold } from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";
import { Providers } from "./src/components/Providers";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
  });

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      messaging()
        .getToken()
        .then((token) => {
          console.log("FCM Token:", token);
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

  return (
    <Providers>
      <StatusBar backgroundColor="transparent" style="dark" translucent />
      {fontsLoaded && <Routes />}
    </Providers>
  );
}
