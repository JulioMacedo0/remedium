import { z } from "zod";

export const AlertType = {
  INTERVAL: "INTERVAL",
  WEEKLY: "WEEKLY",
  DAILY: "DAILY",
  DATE: "DATE",
} as const;

const DayOfWeek = {
  SUNDAY: "SUNDAY",
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
} as const;

const unitOfMeasurament = {
  g: "g",
  mg: "mg",
  mcg: "mcg",
  l: "l",
  ml: "ml",
  drops: "drops",
  units: "units",
} as const;

const intervalAlertSchema = z.object({
  alertType: z.literal(AlertType.INTERVAL),
  hour: z.number({ required_error: "field hour is required" }),
  minute: z.number({ required_error: "field minute is required" }),
});

const dateAlertSchema = z.object({
  alertType: z.literal(AlertType.DATE),
  date: z.date({ required_error: "field date is required" }),
});

const weeklyAlertSchema = z.object({
  alertType: z.literal(AlertType.WEEKLY),
  hour: z.number({ required_error: "field hour is required" }),
  minute: z.number({ required_error: "field minute is required" }),
  week: z
    .nativeEnum(DayOfWeek, { required_error: "field week is required" })
    .array()
    .min(1, { message: "field week at least 1 element" }),
});

const dailyAlertSchema = z.object({
  alertType: z.literal(AlertType.DAILY),
  hour: z.number({ required_error: "field hour is required" }),
  minute: z.number({ required_error: "field minute is required" }),
});

const baseSchema = z.object({
  title: z
    .string({
      required_error: "field title is required",
    })
    .min(1, "field title is required"),
  subtitle: z.string({ required_error: "field subtitle is required" }),
  body: z.string({ required_error: "field subtitle is required" }),
  unit_of_measurement: z.nativeEnum(unitOfMeasurament, {
    required_error: "field unit_of_measurement is required",
  }),
});

export const intervalSchema = z
  .object({
    trigger: intervalAlertSchema,
  })
  .merge(baseSchema);

export const dateSchema = z
  .object({
    trigger: dateAlertSchema,
  })
  .merge(baseSchema);

export const weeklySchema = z
  .object({
    trigger: weeklyAlertSchema,
  })
  .merge(baseSchema);

export const dailySchema = z
  .object({
    trigger: dailyAlertSchema,
  })
  .merge(baseSchema);

export type IntervalSchemaType = z.infer<typeof intervalSchema>;
export type DateSchemaType = z.infer<typeof dailySchema>;
export type WeeklySchemaType = z.infer<typeof weeklySchema>;
export type DailySchemaType = z.infer<typeof dailySchema>;
