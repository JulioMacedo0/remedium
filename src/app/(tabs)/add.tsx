import { Button, Pressable, StyleSheet, TextInput } from "react-native";

import { View, Text } from "@/components";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";

import { useTheme } from "@/context";
import * as Notifications from "expo-notifications";
import DropDownPicker from "react-native-dropdown-picker";

import { ThemedStatusBar } from "@/components/ThemedStatusBar";

type NotifyTrigger = "Hourly" | "Daily" | "Weekly" | "Weekends" | "Custom";

export default function Add() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedItem, SetSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { label: "Hourly", value: "Hourly" },
    { label: "Daily", value: "Daily", disabled: false },
    { label: "Weekly", value: "Weekly", disabled: true },
    { label: "Weekends", value: "Weekends", disabled: true },
    { label: "Custom", value: "Custom", disabled: true },
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

  async function schedulePushNotification() {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { date: date.setSeconds(0) },
    });
  }

  return (
    <View style={styles.container}>
      <ThemedStatusBar />
      <View
        style={{
          marginTop: 10,
          width: "90%",
        }}
      >
        <Text style={styles.title}>Start Date</Text>
        <View
          style={{
            marginTop: 10,
            marginBottom: 15,
          }}
        >
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
              placeholder="Type here to translate!"
              defaultValue={date.toLocaleDateString()}
            />
          </Pressable>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          width: "90%",
        }}
      >
        <Text style={styles.title}>Time</Text>
        <View
          transparent
          style={{
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          <Pressable
            disabled={selectedItem == "Hourly"}
            onPress={showTimepicker}
          >
            <TextInput
              style={{
                textAlign: "center",
                borderRadius: 12,
                padding: 12,
                backgroundColor: selectedItem == "Hourly" ? "#CCCCCC" : "#fff",
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
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          width: "90%",
        }}
      >
        <Text style={styles.title}>Schedule</Text>
        <View
          transparent
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          <DropDownPicker
            placeholder="How often?"
            onChangeValue={SetSelectedItem}
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
        </View>
      </View>

      <Button title="test" onPress={schedulePushNotification} />

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
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
