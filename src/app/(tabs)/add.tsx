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

import { Dropdown } from "react-native-element-dropdown";
import {
  InputSection,
  ThemedStatusBar,
  View,
  Text,
  weeksValues,
} from "@/components/";
import { useI18n, useNotification, useTheme } from "@/context";
import { Colors } from "@/constants";

import { useState } from "react";

type NotifyTrigger = "Interval" | "Daily" | "Weekly" | "One-time";
type AndroidMode = "date" | "time";

export default function Add() {
  const { theme } = useTheme();
  const { updateNotification } = useNotification();
  const { i18n } = useI18n();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<AndroidMode>("date");
  const [show, setShow] = useState(false);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [title, setTitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [body, setBody] = useState("");

  type frequencyDropdownDataType = {
    label: string;
    value: NotifyTrigger;
  };

  type weekDropdownDataType = {
    label: string;
    value: weeksValues;
  };

  const frequencyDropdownData: frequencyDropdownDataType[] = [
    { label: i18n.t("ADD.FREQUENCYDROPDOWN.INTERVAL"), value: "Interval" },
    { label: i18n.t("ADD.FREQUENCYDROPDOWN.DAILY"), value: "Daily" },
    { label: i18n.t("ADD.FREQUENCYDROPDOWN.WEEKLY"), value: "Weekly" },
    { label: i18n.t("ADD.FREQUENCYDROPDOWN.ONETIME"), value: "One-time" },
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

  return (
    <View style={styles.flex}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ThemedStatusBar />
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <InputSection
            title={i18n.t("ADD.FREQUENCY")}
            style={{
              zIndex: 101,
            }}
          >
            <Dropdown
              activeColor={Colors[theme].tabBarActiveTintColor}
              containerStyle={{
                borderRadius: 8,
              }}
              style={{
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 8,
              }}
              placeholder={i18n.t("ADD.FREQUENCYDROPDOWN.PLACEHOLDER")}
              labelField="label"
              valueField="value"
              value={frequencyDropdownItem}
              onChange={setfrequencyDropdownItem}
              data={frequencyDropdownData}
            />
          </InputSection>

          {frequencyDropdownItem?.value == "Weekly" && (
            <InputSection title={i18n.t("ADD.WEEK")} style={{ zIndex: 100 }}>
              <Dropdown
                activeColor={Colors[theme].tabBarActiveTintColor}
                containerStyle={{
                  borderRadius: 8,
                }}
                style={{
                  backgroundColor: "#fff",
                  padding: 8,
                  borderRadius: 8,
                }}
                placeholder={i18n.t("ADD.WEEKDROPDOWN.PLACEHOLDER")}
                labelField="label"
                valueField="value"
                value={weekDropdownItem}
                onChange={setWeekDropdownItem}
                data={weekDropdownData}
              />
            </InputSection>
          )}

          {frequencyDropdownItem?.value == "One-time" && (
            <InputSection title={i18n.t("ADD.FREQUENCYDROPDOWN.DAY")}>
              <Pressable style={{}} onPress={showDatepicker}>
                <TextInput
                  style={{
                    textAlign: "center",
                    padding: 12,
                    backgroundColor: "#fff",
                    color: "#000",
                    borderRadius: 8,
                  }}
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
                <TextInput
                  style={{
                    textAlign: "center",
                    borderRadius: 8,
                    padding: 12,
                    backgroundColor: "#fff",
                    color: "#000",
                  }}
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
                <TextInput
                  style={{
                    width: 60,
                    textAlign: "center",
                    borderRadius: 12,
                    padding: 12,
                    backgroundColor: "#fff",
                    color: "#000",
                  }}
                  keyboardType="numeric"
                  defaultValue={hour.toString().padStart(2, "0")}
                  onChangeText={(text) => setHour(Number(text))}
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
                <TextInput
                  style={{
                    width: 60,
                    textAlign: "center",
                    borderRadius: 12,
                    padding: 12,
                    backgroundColor: "#fff",
                    color: "#000",
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
                borderRadius: 12,
                padding: 12,
                backgroundColor: "#fff",
                color: "#000",
              }}
              defaultValue={title}
              placeholder="Dipirona"
              onChangeText={(text) => setTitle(text)}
            />
          </InputSection>

          <InputSection title={i18n.t("ADD.DOSE")}>
            <TextInput
              style={{
                textAlign: "center",
                borderRadius: 12,
                padding: 12,
                backgroundColor: "#fff",
                color: "#000",
              }}
              defaultValue={subtitle}
              placeholder="500mg"
              onChangeText={(text) => setsubtitle(text)}
            />
          </InputSection>

          <InputSection title={i18n.t("ADD.INSTRUCTIONS")}>
            <TextInput
              style={{
                textAlign: "center",
                borderRadius: 12,
                padding: 12,
                backgroundColor: "#fff",
                color: "#000",
              }}
              defaultValue={body}
              placeholder="Take after breakfast"
              onChangeText={(text) => setBody(text)}
            />
          </InputSection>

          <Pressable
            style={{
              backgroundColor: Colors[theme].tabBarActiveTintColor,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
            }}
            onPress={() => scheduleNotification(frequencyDropdownItem?.value)}
          >
            <Text style={{ color: "#fff" }}>{i18n.t("ADD.SCHEDULER")}</Text>
          </Pressable>
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
