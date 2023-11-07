import { ComponentProps, ReactNode } from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import {
  InputContainer,
  InputText,
  InputTextContainer,
  ErrorText,
  InputMaskText,
} from "./styles";

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

type Input<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>
> = Omit<ComponentProps<typeof InputText>, "defaultValue"> & {
  control: Control<TFieldValues>;
  name: TFieldName;
  defaultValue?: TFieldValues[TFieldName];
  beforeIcon?: ReactNode;
  afterIcon?: ReactNode;
  error?: string | null;
  amount?: boolean;
  onPressAfterIcon?: (...options: any) => void;
  onPressBeforeIcon?: (...options: any) => void;
};

export function Input<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>
>({
  control,
  name,
  defaultValue,
  beforeIcon,
  afterIcon,
  error,
  amount,
  onPressAfterIcon,
  onPressBeforeIcon,
  ...props
}: Input<TFieldValues, TFieldName>) {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    defaultValue,
  });

  return (
    <InputContainer>
      <InputTextContainer error={!!error} style={styles.shadow}>
        {beforeIcon && (
          <TouchableOpacity onPress={onPressBeforeIcon}>
            {beforeIcon}
          </TouchableOpacity>
        )}
        {amount ? (
          <InputMaskText
            onChangeText={(text) => {
              const numericValue =
                parseFloat(text.replace(/[^0-9]/g, "")) / 100;
              onChange(numericValue);
            }}
            value={value}
            type="money"
            options={{
              precision: 2,
              separator: ",",
              delimiter: ".",
              unit: "R$",
              suffixUnit: "",
            }}
            keyboardType="numeric"
            {...props}
          />
        ) : (
          <InputText onChangeText={onChange} value={value} {...props} />
        )}

        {afterIcon && (
          <TouchableOpacity onPress={onPressAfterIcon}>
            {afterIcon}
          </TouchableOpacity>
        )}
      </InputTextContainer>
      <ErrorText error={!!error}>{error}</ErrorText>
    </InputContainer>
  );
}
