import styled from "styled-components/native";

export const ExpenseJournalRecordView = styled.TouchableOpacity`
  border-radius: 16px;
  flex-direction: row;
  flex: 1;
  gap: 8px;
  padding: 12px 8px;
  background-color: #ffffff;
`;

type Dot = {
  color: string;
};

export const Dot = styled.View<Dot>`
  margin-top: 6px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ color }) => color};
`;

export const RightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;
