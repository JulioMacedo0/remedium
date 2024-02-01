import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ScrollView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import {
  InputSection,
  ThemedStatusBar,
  View,
  weeksValues,
  DropdownItem,
  StyledTextInput,
} from "@/components/";
import { useI18n, useNotification, useTheme } from "@/context";

import { useRef, useState } from "react";
import { StyledDropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";

type NotifyTrigger = "Interval" | "Daily" | "Weekly" | "One-time";
type AndroidMode = "date" | "time";

export default function Add() {
  const { theme } = useTheme();
  const { updateNotification } = useNotification();
  const { i18n } = useI18n();

  type InputType = {
    hour: string;
    minute: string;
    title: string;
    subtitle: string;
    body: string;
    unitOfMeasurament: string;
    dayOfWeek: string;
    alertType: string;
    repeats: true;
    date: Date;
  };

  type InputValue = keyof InputType;

  const [inputs, setInputs] = useState<InputType>({} as InputType);

  const handleOnchange = (text: string, input: keyof InputValue) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<AndroidMode>("date");
  const [show, setShow] = useState(false);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [title, setTitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [body, setBody] = useState("");

  const minutesRef = useRef<TextInput | null>(null);
  const remedyNameRef = useRef<TextInput | null>(null);
  const doaseRef = useRef<TextInput | null>(null);
  const instructionsRef = useRef<TextInput | null>(null);

  enum AlertType {
    INTERVAL,
    WEEKLY,
    DAILY,
    DATE,
  }

  type frequencyDropdownDataType = {
    label: string;
    value: AlertType;
  };

  type weekDropdownDataType = {
    label: string;
    value: weeksValues;
  };

  const frequencyDropdownData: frequencyDropdownDataType[] = [
    {
      label: i18n.t("ADD.FREQUENCYDROPDOWN.INTERVAL"),
      value: AlertType.INTERVAL,
    },
    { label: i18n.t("ADD.FREQUENCYDROPDOWN.DAILY"), value: AlertType.DAILY },
    { label: i18n.t("ADD.FREQUENCYDROPDOWN.WEEKLY"), value: AlertType.WEEKLY },
    { label: i18n.t("ADD.FREQUENCYDROPDOWN.ONETIME"), value: AlertType.DATE },
  ];

  const [frequencyDropdownItem, setfrequencyDropdownItem] =
    useState<frequencyDropdownDataType | null>(null);

  const weekDropdownData: weekDropdownDataType[] = [
    { label: i18n.t("ADD.WEEKDROPDOWN.SUNDAY"), value: 1 },
    { label: i18n.t("ADD.WEEKDROPDOWN.MONDAY"), value: 2 },
    { label: i18n.t("ADD.WEEKDROPDOWN.TUESDAY"), value: 3 },
    { label: i18n.t("ADD.WEEKDROPDOWN.WEDNESDAY"), value: 4 },
    { label: i18n.t("ADD.WEEKDROPDOWN.THURSDAY"), value: 5 },
    { label: i18n.t("ADD.WEEKDROPDOWN.FRIDAY"), value: 6 },
    { label: i18n.t("ADD.WEEKDROPDOWN.SATURDAY"), value: 7 },
  ];
  const [weekDropdownItem, setWeekDropdownItem] =
    useState<weekDropdownDataType | null>(null);

  const resetForm = () => {
    setWeekDropdownItem(null);
    setfrequencyDropdownItem(null);

    setHour(0);
    setMinute(0);
    setTitle("");
    setsubtitle("");
    setBody("");
  };

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: AndroidMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  async function scheduleNotification(frequence: NotifyTrigger | undefined) {
    if (!frequence) return;

    let trigger: Notifications.NotificationTriggerInput = null;

    if (frequence == "Daily") {
      trigger = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        repeats: true,
      };
    } else if (frequence == "Interval") {
      const seconds = hour * 3600 + minute * 60;
      trigger = {
        seconds,
        repeats: true,
      };
    } else if (frequence == "One-time") {
      trigger = {
        date,
      };
    } else if ((frequence = "Weekly")) {
      if (weekDropdownItem == null) return;

      trigger = {
        weekday: weekDropdownItem.value,
        hour: date.getHours(),
        minute: date.getMinutes(),
        repeats: true,
      };
    }

    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          subtitle: subtitle,
          body: body,
          data: { data: "goes here" },
        },
        trigger,
      });
      console.log(`scheduleNotificationAsync ${id}`);
      resetForm();
      updateNotification();
    } catch (error) {
      console.log(error);
    }
  }
  (async () => {
    let token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "0e830c18-6f43-4321-9330-c85a1c4acdb0",
      })
    ).data;
    console.log(token);
  })().catch((err) => {
    console.error(err);
  });

  return (
    <View style={styles.flex}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ThemedStatusBar />
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <InputSection title={i18n.t("ADD.FREQUENCY")}>
            <StyledDropdown
              placeholder={i18n.t("ADD.FREQUENCYDROPDOWN.PLACEHOLDER")}
              labelField="label"
              valueField="value"
              value={frequencyDropdownItem}
              onChange={(value) => handleOnchange("", "AlertType")}
              data={frequencyDropdownData}
              renderItem={(item) => (
                <DropdownItem item={item} currentItem={frequencyDropdownItem} />
              )}
            />
          </InputSection>

          {/* {frequencyDropdownItem?.value == "Weekly" && (
            <InputSection title={i18n.t("ADD.WEEK")}>
              <StyledDropdown
                placeholder={i18n.t("ADD.WEEKDROPDOWN.PLACEHOLDER")}
                labelField="label"
                valueField="value"
                value={weekDropdownItem}
                onChange={setWeekDropdownItem}
                data={weekDropdownData}
                renderItem={(item) => (
                  <DropdownItem item={item} currentItem={weekDropdownItem} />
                )}
              />
            </InputSection>
          )} */}

          {frequencyDropdownItem?.value == "One-time" && (
            <InputSection title={i18n.t("ADD.FREQUENCYDROPDOWN.DAY")}>
              <Pressable style={{}} onPress={showDatepicker}>
                <StyledTextInput
                  editable={false}
                  defaultValue={date.toLocaleDateString()}
                />
              </Pressable>
            </InputSection>
          )}

          <InputSection
            title={i18n.t("ADD.TIME")}
            style={{
              alignItems:
                frequencyDropdownItem?.value == "Interval"
                  ? "center"
                  : undefined,
            }}
          >
            {frequencyDropdownItem?.value != "Interval" ? (
              <Pressable onPress={showTimepicker}>
                <StyledTextInput
                  editable={false}
                  defaultValue={`${date
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${date
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`}
                />
              </Pressable>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <StyledTextInput
                  style={{
                    width: 70,
                  }}
                  keyboardType="numeric"
                  defaultValue={hour.toString().padStart(2, "0")}
                  onChangeText={(text) => setHour(Number(text))}
                  onSubmitEditing={() => {
                    minutesRef.current?.focus();
                  }}
                />
                <View
                  style={{
                    justifyContent: "space-between",
                    marginVertical: 12,
                  }}
                >
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: "#fff",
                      borderRadius: 999,
                    }}
                  />
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: "#fff",
                      borderRadius: 999,
                    }}
                  />
                </View>
                <StyledTextInput
                  style={{
                    width: 70,
                  }}
                  // ref={minutesRef}
                  onSubmitEditing={() => {
                    remedyNameRef.current?.focus();
                  }}
                  keyboardType="numeric"
                  defaultValue={minute.toString().padStart(2, "0")}
                  onChangeText={(text) => setMinute(Number(text))}
                />
              </View>
            )}
          </InputSection>

          <InputSection title={i18n.t("ADD.REMEDYNAME")}>
            <TextInput
              style={{
                textAlign: "center",
                borderRadius: 999,
                padding: 12,
                backgroundColor: "#fff",
                color: "#000",
              }}
              defaultValue={title}
              placeholder="Dipirona"
              onChangeText={(text) => setTitle(text)}
              ref={remedyNameRef}
              onSubmitEditing={() => {
                doaseRef.current?.focus();
              }}
            />
          </InputSection>

          <InputSection
            title={i18n.t("ADD.DOSE")}
            style={{
              display: "flex",
            }}
          >
            <TextInput
              style={{
                textAlign: "center",
                borderRadius: 999,
                padding: 12,
                backgroundColor: "#fff",
                color: "#000",
              }}
              ref={doaseRef}
              defaultValue={subtitle}
              placeholder="500mg"
              onChangeText={(text) => setsubtitle(text)}
              onSubmitEditing={() => {
                instructionsRef.current?.focus();
              }}
            />
            <TextInput
              style={{
                textAlign: "center",
                borderRadius: 999,
                padding: 12,
                backgroundColor: "#fff",
                color: "#000",
              }}
              ref={doaseRef}
              defaultValue={subtitle}
              placeholder="500mg"
              onChangeText={(text) => setsubtitle(text)}
              onSubmitEditing={() => {
                instructionsRef.current?.focus();
              }}
            />
          </InputSection>

          <InputSection title={i18n.t("ADD.INSTRUCTIONS.TITLEINPUT")}>
            <TextInput
              style={{
                textAlign: "center",
                borderRadius: 999,
                padding: 12,
                backgroundColor: "#fff",
                color: "#000",
              }}
              defaultValue={body}
              ref={instructionsRef}
              placeholder={i18n.t("ADD.INSTRUCTIONS.PLACEHOLDER")}
              onChangeText={(text) => setBody(text)}
              onSubmitEditing={() => {
                scheduleNotification(frequencyDropdownItem?.value);
              }}
            />
          </InputSection>

          <Button
            text={i18n.t("ADD.SCHEDULER")}
            onPress={() => scheduleNotification(frequencyDropdownItem?.value)}
          />
          <View style={{ height: 10 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={(event, selectedDate) =>
            onChange(event, selectedDate as Date)
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
