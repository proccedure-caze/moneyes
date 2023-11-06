import { ComponentProps, ReactNode } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import {
  InputContainer,
  InputText,
  InputTextContainer,
  ErrorText,
} from "./Input/styles";

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});

type Textarea<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>
> = Omit<ComponentProps<typeof InputText>, "defaultValue"> & {
  control: Control<TFieldValues>;
  name: TFieldName;
  defaultValue?: TFieldValues[TFieldName];
  error?: string | null;
};

export function Textarea<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>
>({
  control,
  name,
  defaultValue,
  error,
  ...props
}: Textarea<TFieldValues, TFieldName>) {
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
        <InputText
          style={{ textAlignVertical: "top" }}
          multiline
          numberOfLines={4}
          onChangeText={onChange}
          value={value}
          {...props}
        />
      </InputTextContainer>
      <ErrorText error={!!error}>{error}</ErrorText>
    </InputContainer>
  );
}
