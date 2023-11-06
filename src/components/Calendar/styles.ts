import styled from "styled-components/native";
import { darkenColor } from "../../utils";

export const Container = styled.View`
  gap: 38px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MonthText = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.FONT_FAMILIES.BOLD};
`;

export const WeekDaysContainer = styled.View`
  gap: 12px;
`;

export const WeekDaysRow = styled.View`
  flex-direction: row;
`;

type Index = {
  index: number;
};

export const DayText = styled.Text<Index>`
  flex: 1;
  text-align: center;
  font-size: 11px;
  margin-left: ${({ index }) => (index === 0 ? 0 : 26)}px;
`;

export const WeeksContainer = styled.View`
  gap: 28px;
`;

export const WeekRow = styled.View`
  flex-direction: row;
`;

export const DayContainer = styled.TouchableOpacity<Index>`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: ${({ index }) => (index === 0 ? 0 : 26)}px;
`;

export const SelectedDayCircle = styled.View`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-color: #ea5b5f;
  border-width: 2px;
`;

export const DotsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  position: absolute;
  top: 100%;
`;

type Dot = {
  isCurrentMonth: boolean;
  color: string;
};

export const Dot = styled.View<Dot>`
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background-color: ${({ isCurrentMonth, color }) =>
    isCurrentMonth ? color : darkenColor(color)};
`;
