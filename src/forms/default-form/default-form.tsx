import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { useI18nStore } from "@/stores/i18n/useI18nStore";
import { InputForm } from "@/components";
import { useRef } from "react";
import { TextInput } from "react-native";
import {
  baseSchemaType,
  IntervalSchemaType,
  DailySchemaType,
  DateSchemaType,
  WeeklySchemaType,
} from "@/schema/alert-schema";

type TControl = Control<
  IntervalSchemaType | DailySchemaType | DateSchemaType | WeeklySchemaType
>;

type DefaultfomrProps = {
  control: TControl;
  errors: FieldErrors<baseSchemaType>;
  initialValue?: baseSchemaType;
  remedyNameInputRef: React.MutableRefObject<TextInput | null>;
  onSubmitEditing: () => void;
};

export const DefaultForm = ({
  control,
  errors,
  initialValue,
  remedyNameInputRef,
  onSubmitEditing,
}: DefaultfomrProps) => {
  const i18n = useI18nStore((state) => state.i18n);

  const DoseNameInputRef = useRef<TextInput | null>(null);
  const insctructionsRef = useRef<TextInput | null>(null);

  return (
    <>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value = "" } }) => (
          <InputForm
            ref={remedyNameInputRef}
            Label={i18n.t("FROMS.DEFAULT.NAME")}
            ErrorText={errors.title?.message}
            InputProps={{
              onBlur: () => onBlur(),
              onChangeText: (text) => onChange(text),
              value,
              placeholder: initialValue?.title ?? "Dipirona",
              blurOnSubmit: false,
              returnKeyType: "next",
              onSubmitEditing: () => DoseNameInputRef.current?.focus(),
              type: "text",
            }}
            FormControlProps={{
              isInvalid: !!errors.title,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="subtitle"
        render={({ field: { onChange, onBlur, value = "" } }) => (
          <InputForm
            ref={DoseNameInputRef}
            Label={i18n.t("FROMS.DEFAULT.DOSE")}
            ErrorText={errors.subtitle?.message}
            FormControlProps={{ isInvalid: !!errors.subtitle }}
            InputProps={{
              blurOnSubmit: false,
              returnKeyType: "next",
              onSubmitEditing: () => insctructionsRef.current?.focus(),
              type: "text",
              placeholder: initialValue?.subtitle ?? "1 pill",
              onChangeText: (text) => onChange(text),
              onBlur: () => onBlur,
              value: value,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="body"
        render={({ field: { onChange, onBlur, value = "" } }) => (
          <InputForm
            ref={insctructionsRef}
            Label={i18n.t("FROMS.DEFAULT.INSTRUCTIONS")}
            ErrorText={errors.body?.message}
            FormControlProps={{
              isInvalid: !!errors.body,
            }}
            InputProps={{
              returnKeyType: "done",
              onSubmitEditing: () => onSubmitEditing(),
              type: "text",
              placeholder: initialValue?.body ?? "Take before breakfast",
              onChangeText: (text) => onChange(text),
              onBlur: () => onBlur,
              value: value,
            }}
          />
        )}
      />
    </>
  );
};
