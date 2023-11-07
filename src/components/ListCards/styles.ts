import styled from "styled-components/native";

export const CardsView = styled.ScrollView`
  gap: 14px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: ${({ theme }) => theme.RADII.SM};
  max-height: 360px;
`;

export const CardContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardContentRightView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-right: 12px;
`;

export const CardAmount = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILIES.BOLD};
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const CardDescription = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILIES.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY};
  font-size: 14px;
`;

export const UpdateCard = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILIES.BOLD};
  color: ${({ theme }) => theme.COLORS.BLACK};
`;
