import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const HomeContainer = styled(SafeAreaView)`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 34px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_LIGHT};
  gap: 10px;
  flex: 1;
`;

export const HeaderButtonsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const MostRightButtons = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const HomeContent = styled.View`
  margin-top: 34px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.COLORS.GRAY_2};
  border-top-style: solid;
  padding-bottom: 34px;
`;

export const MainContent = styled.View`
  padding-top: 32px;
  flex-direction: row;
  gap: 18px;
`;

export const LiquidAnimationContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  height: 160px;
  width: 160px;
  border-radius: 999999px;
  position: relative;
`;

type RedFill = {
  percentage: number;
};

export const CircleContainer = styled.View`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const RedFill = styled.View<RedFill>`
  background-color: ${({ theme }) => theme.COLORS.RED};
  width: 100%;
  height: ${({ percentage }) => percentage}%;
  position: absolute;
  bottom: 0;
`;

export const LiquidAnimationPercentage = styled.Text`
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${({ theme }) => theme.COLORS.BLACK};
  font-family: ${({ theme }) => theme.FONT_FAMILIES.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZES["4XL"]};
`;

export const ExpensesView = styled.View`
  gap: 12px;
  flex: 1;
  height: 100%;
`;

export const ExpenseContainer = styled.View`
  gap: 4px;
`;

export const ExpenseContent = styled.View`
  border-radius: ${({ theme }) => theme.RADII.XS};
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  justify-content: center;
  align-items: center;
  padding: 14px;
`;

export const ExpenseTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILIES.BOLD};
  color: ${({ theme }) => theme.COLORS.BLACK};
  font-size: ${({ theme }) => theme.FONT_SIZES.SM};
`;

export const ExpenseAmount = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILIES.BOLD};
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const ExpensesHistoryView = styled.View`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.COLORS.GRAY_2};
  border-top-style: solid;
  padding-top: 24px;
  margin-top: 16px;
`;

export const CardsSectionView = styled.View`
  gap: 12px;
  margin-top: 40px;
`;

export const CardsSectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILIES.BOLD};
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const CardsView = styled.View`
  gap: 14px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: ${({ theme }) => theme.RADII.SM};
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
