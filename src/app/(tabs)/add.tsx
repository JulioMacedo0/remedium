import {
  Button,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import { View, Text } from "@/components";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";

import { useTheme } from "@/context";
import * as Notifications from "expo-notifications";
import DropDownPicker from "react-native-dropdown-picker";

import { ThemedStatusBar } from "@/components/ThemedStatusBar";
import { InputSection } from "@/components/InputSection";
import { ScrollView } from "react-native-gesture-handler";

type NotifyTrigger = "Interval" | "Daily" | "Weekly" | "One-time" | null;

export default function Add() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<NotifyTrigger>(null);
  const [selectedItem, SetSelectedItem] = useState<NotifyTrigger>(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [items, setItems] = useState<
    { label: string; value: NotifyTrigger; disabled?: boolean }[]
  >([
    { label: "Interval", value: "Interval" },
    { label: "Daily", value: "Daily", disabled: false },
    { label: "Weekly", value: "Weekly", disabled: false },
    { label: "One-time", value: "One-time", disabled: false },
  ]);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  async function schedulePushNotification(frequence: NotifyTrigger) {
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
      console.log(seconds);
      trigger = {
        seconds,
        repeats: true,
      };
    } else if (frequence == "One-time") {
      trigger = {
        date,
      };
    } else if ((frequence = "Weekly")) {
      trigger = {
        weekday: 0,
        hour: date.getHours(),
        minute: date.getMinutes(),
        repeats: true,
      };
    }
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        subtitle: "subtitle",
        body: body,

        data: { data: "goes here" },
      },
      trigger,
    });

    console.log(`scheduleNotificationAsync ${id}`);
  }

  return (
    <View style={styles.container}>
      <ThemedStatusBar />

      <InputSection
        title="Schedule"
        style={{
          zIndex: 2000,
        }}
      >
        <DropDownPicker
          placeholder="How often?"
          onChangeValue={(value: NotifyTrigger) => {
            SetSelectedItem(value);
          }}
          style={{}}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          itemSeparator
          disabledItemContainerStyle={{
            backgroundColor: "#ccc",
          }}
        />
      </InputSection>

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

      <InputSection title="Time" style={{ alignItems: "center" }}>
        {selectedItem != "Interval" ? (
          <Pressable onPress={showTimepicker}>
            <TextInput
              style={{
                textAlign: "center",
                borderRadius: 12,
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

      <InputSection title="Alert Title">
        <TextInput
          style={{
            textAlign: "center",
            borderRadius: 12,
            padding: 12,
            backgroundColor: "#fff",
            color: "#000",
          }}
          defaultValue={title}
          placeholder="Alert Title"
          onChangeText={(text) => setTitle(text)}
        />
      </InputSection>

      <InputSection title="Alert Body">
        <TextInput
          style={{
            textAlign: "center",
            borderRadius: 12,
            padding: 12,
            backgroundColor: "#fff",
            color: "#000",
          }}
          defaultValue={body}
          placeholder="Alert Body"
          onChangeText={(text) => setBody(text)}
        />
      </InputSection>

      <Button
        title="scheduler"
        onPress={() => schedulePushNotification(selectedItem)}
      />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
