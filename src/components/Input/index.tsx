import { ComponentProps, ReactNode } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import {
  InputContainer,
  InputText,
  InputTextContainer,
  ErrorText,
} from "./styles";

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
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
        <InputText onChangeText={onChange} value={value} {...props} />
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
