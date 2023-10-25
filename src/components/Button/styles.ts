import styled from "styled-components/native";

export const ButtonContainer = styled.TouchableOpacity`
  padding: 12px 0;
  border-radius: ${({ theme }) => theme.RADII.LG};
`;

export const ButtonContent = styled.Text`
  text-align: center;
`;
