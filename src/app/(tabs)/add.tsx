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
import DropDownPicker from "react-native-dropdown-picker";

import {
  InputSection,
  ThemedStatusBar,
  View,
  Text,
  weeksValues,
} from "@/components/";
import { useTheme } from "@/context";
import { Colors } from "@/constants";

import { useState } from "react";

type NotifyTrigger = "Interval" | "Daily" | "Weekly" | "One-time" | null;
type AndroidMode = "date" | "time";

export default function Add() {
  const { theme } = useTheme();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<AndroidMode>("date");
  const [show, setShow] = useState(false);

  const [selectedItem, SetSelectedItem] = useState<NotifyTrigger>(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [title, setTitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [body, setBody] = useState("");

  const [isOpenScheduleDropdownValue, setIsOpenScheduleDropdownValue] =
    useState(false);
  const [scheduleDropdownValue, setScheduleDropdownValue] =
    useState<NotifyTrigger>(null);

  const [scheduleDropdownItems, setScheduleDropdownItems] = useState([
    { label: "Interval", value: "Interval" },
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "One-time", value: "One-time" },
  ]);

  const [isOpenWeekDropdownValue, setIsOpenWeekDropdownValue] = useState(false);
  const [weekDropdownValue, setWeekDropdownValue] =
    useState<weeksValues | null>(null);
  const [weekDropdownItems, setWeekDropdownItems] = useState([
    { label: "Sunday", value: 1 },
    { label: "Monday", value: 2 },
    { label: "Tuesday", value: 3 },
    { label: "Wednesday", value: 4 },
    { label: "Thursday", value: 5 },
    { label: "Friday", value: 6 },
    { label: "Saturday", value: 7 },
  ]);

  const resetForm = () => {
    setWeekDropdownValue(null);
    setScheduleDropdownValue(null);
    SetSelectedItem(null);
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

  async function scheduleNotification(frequence: NotifyTrigger) {
    if (selectedItem == null) {
      alert("Schedule missing");
      return;
    }

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
      if (weekDropdownValue == null) return;

      trigger = {
        weekday: weekDropdownValue,
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
            title="Schedule"
            style={{
              zIndex: 101,
            }}
          >
            <DropDownPicker
              placeholder="How often?"
              onChangeValue={(value: NotifyTrigger) => {
                SetSelectedItem(value);
              }}
              style={{}}
              open={isOpenScheduleDropdownValue}
              value={scheduleDropdownValue}
              items={scheduleDropdownItems}
              setOpen={setIsOpenScheduleDropdownValue}
              setValue={setScheduleDropdownValue}
              setItems={setScheduleDropdownItems}
              itemSeparator
              disabledItemContainerStyle={{
                backgroundColor: "#ccc",
              }}
            />
          </InputSection>

          {selectedItem == "Weekly" && (
            <InputSection title="Week" style={{ zIndex: 100 }}>
              <DropDownPicker
                placeholder="How week?"
                onChangeValue={(value) => {
                  setWeekDropdownValue(value);
                }}
                style={{}}
                open={isOpenWeekDropdownValue}
                value={weekDropdownValue}
                items={weekDropdownItems}
                setOpen={setIsOpenWeekDropdownValue}
                setValue={setWeekDropdownValue}
                setItems={setWeekDropdownItems}
                itemSeparator
                disabledItemContainerStyle={{
                  backgroundColor: "#ccc",
                }}
              />
            </InputSection>
          )}

          {selectedItem == "One-time" && (
            <InputSection title="Day">
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
            title={"Time"}
            style={{
              alignItems: selectedItem == "Interval" ? "center" : undefined,
            }}
          >
            {selectedItem != "Interval" ? (
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

          <InputSection title="Remedy name">
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

          <InputSection title="Remedy Weight">
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

          <InputSection title="Instructions">
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
            onPress={() => scheduleNotification(selectedItem)}
          >
            <Text style={{ color: "#fff" }}>scheduler</Text>
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
