import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ArrowButton, HeaderContainer, Title } from "./styles";

type Header = {
  title: string;
  disabled?: boolean;
};

export function Header({ title, disabled }: Header) {
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
          disabled={disabled}
        >
          <Feather name="chevron-left" color="#000" size={24} />
        </ArrowButton>
      )}

      <Title>{title}</Title>
    </HeaderContainer>
  );
}
