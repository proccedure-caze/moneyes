import { View, Text, TouchableOpacity } from "react-native";
import { getWeekDays } from "../../utils";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  DayContainer,
  Dot,
  DotsContainer,
  Header,
  MonthText,
  SelectedDayCircle,
  WeekDaysContainer,
  WeekDaysRow,
  WeekRow,
  WeeksContainer,
  DayText,
} from "./styles";
import { Expense } from "../../types/expense";

interface CalendarWeek {
  week: number;
  days: Array<{
    date: dayjs.Dayjs;
  }>;
}

type CalendarWeeks = CalendarWeek[];

interface CalendarProps {
  selectedDate: Date | null;
  expenses: Expense[];
  onDateSelected(date: Date): void;
}

export function Calendar({
  onDateSelected,
  selectedDate,
  expenses,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1);
  });

  const currentMonth = currentDate.format("MMMM");
  const currentYear = currentDate.format("YYYY");

  const expensesDaysArray = useMemo(() => {
    const groupedByDay: Record<
      string,
      { id: string; date: Date; color: string }[]
    > = {};

    expenses.forEach((expense) => {
      const dateKey = dayjs(expense.start_date.toDate()).format("YYYY-MM-DD");

      if (!groupedByDay[dateKey]) {
        groupedByDay[dateKey] = [];
      }

      if (groupedByDay[dateKey].length < 2) {
        groupedByDay[dateKey].push({
          date: expense.start_date.toDate(),
          color: expense.color,
          id: expense.id!,
        });
      }
    });

    return Object.values(groupedByDay).flat();
  }, [expenses]);

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.clone().set("date", i + 1);
    });

    const firstWeekDay = currentDate.get("day");

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, "day");
      })
      .reverse();

    const lastDayInCurrentMonth = currentDate
      .clone()
      .set("date", currentDate.daysInMonth());
    const lastWeekDay = lastDayInCurrentMonth.get("day");

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, "day");
    });

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date };
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
        };
      }),
      ...nextMonthFillArray.map((date) => {
        return { date };
      }),
    ];

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0;

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          });
        }

        return weeks;
      },
      []
    );

    return calendarWeeks;
  }, [currentDate]);

  const shortWeekDays = getWeekDays({ short: true });

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, "month");
    setCurrentDate(previousMonthDate);

    onDateSelected(dayjs(selectedDate).subtract(1, "month").toDate());
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, "month");
    setCurrentDate(nextMonthDate);
    onDateSelected(dayjs(selectedDate).add(1, "month").toDate());
  }

  const handleDatePress = (date: dayjs.Dayjs) => {
    const isSameMonth = date.isSame(selectedDate, "month");

    if (!isSameMonth) setCurrentDate(date.set("date", 1));
    onDateSelected(date.toDate());
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Feather name="chevron-left" size={24} />
        </TouchableOpacity>
        <MonthText>
          {currentMonth} {currentYear}
        </MonthText>
        <TouchableOpacity onPress={handleNextMonth}>
          <Feather name="chevron-right" size={24} />
        </TouchableOpacity>
      </Header>

      <WeekDaysContainer>
        <WeekDaysRow>
          {shortWeekDays.map((day, index) => (
            <DayText key={day} index={index}>
              {day}
            </DayText>
          ))}
        </WeekDaysRow>

        <WeeksContainer>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <WeekRow key={week}>
                {days.map(({ date }, index) => {
                  const isSelectedDate =
                    selectedDate && dayjs(selectedDate).isSame(date, "day");
                  const isCurrentMonth = date.isSame(currentDate, "month");

                  return (
                    <DayContainer
                      key={date.toString()}
                      onPress={() => handleDatePress(date)}
                      index={index}
                    >
                      {isSelectedDate && <SelectedDayCircle />}

                      <Text style={{ opacity: isCurrentMonth ? 1 : 0.5 }}>
                        {date.get("date").toString().padStart(2, "0")}
                      </Text>

                      {expensesDaysArray.some((expense) =>
                        dayjs(expense.date).isSame(date, "date")
                      ) && (
                        <DotsContainer>
                          {expensesDaysArray
                            .filter((expense) =>
                              dayjs(expense.date).isSame(date, "date")
                            )
                            .map((expense) => {
                              return (
                                <Dot
                                  key={expense.id}
                                  color={expense.color}
                                  isCurrentMonth={isCurrentMonth}
                                />
                              );
                            })}
                        </DotsContainer>
                      )}
                    </DayContainer>
                  );
                })}
              </WeekRow>
            );
          })}
        </WeeksContainer>
      </WeekDaysContainer>
    </Container>
  );
}
