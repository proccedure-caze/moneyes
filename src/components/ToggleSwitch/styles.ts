import { Animated } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SwitchContainer = styled.View`
  width: 60px;
  border-radius: 30px;
  padding: 2px;
  background-color: #e5e5ea;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #333;
  margin-right: 10px;
`;

export const Toggle = styled(Animated.View)`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: white;
`;
