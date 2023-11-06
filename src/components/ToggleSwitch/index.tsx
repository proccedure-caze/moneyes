import { useState } from "react";
import { Animated, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Container, SwitchContainer, Title, Toggle } from "./styles";

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

type ToggleSwitchProps = {
  title?: string;
  isEnabled: boolean;
  toggleSwitch: () => void;
};

export function ToggleSwitch({
  isEnabled,
  toggleSwitch,
  title,
}: ToggleSwitchProps) {
  const [animatedValue] = useState(new Animated.Value(isEnabled ? 1 : 0));

  const handleToggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    toggleSwitch();
  };

  const moveToggle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  const toggleStyles = {
    transform: [{ translateX: moveToggle }],
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#ccc", "#EA5B5F"],
    }),
  };

  return (
    <Container>
      {title && <Title>{title}</Title>}
      <TouchableOpacity onPress={handleToggleSwitch}>
        <SwitchContainer>
          <Toggle style={{ ...toggleStyles, ...styles.shadow }} />
        </SwitchContainer>
      </TouchableOpacity>
    </Container>
  );
}
