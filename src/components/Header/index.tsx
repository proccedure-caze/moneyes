import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ArrowButton, HeaderContainer, Title } from "./styles";

type Header = {
  title: string;
};

export function Header({ title }: Header) {
  const [canGoBack, setCanGoBack] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setCanGoBack(navigation.canGoBack());
    }, [navigation.canGoBack()])
  );

  return (
    <HeaderContainer>
      {canGoBack && (
        <ArrowButton
          style={{
            position: "absolute",
            top: 55,
            left: 24,
          }}
          onPress={navigation.goBack}
        >
          <Feather name="chevron-left" color="#000" size={24} />
        </ArrowButton>
      )}

      <Title>{title}</Title>
    </HeaderContainer>
  );
}
