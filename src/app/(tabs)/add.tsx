import { Pressable, StyleSheet, TextInput } from "react-native";

import { View, Text } from "@/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

import { useTheme } from "@/context";
import * as Notifications from "expo-notifications";
import DropDownPicker from "react-native-dropdown-picker";
export default function Add() {
  const { theme } = useTheme();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Daily", value: "apple" },
    { label: "Weekly", value: "banana" },
    { label: "Weekends", value: "banana" },
    { label: "Custom", value: "banana" },
  ]);

  const onChange = (event, selectedDate) => {
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
      trigger: {},
    });
  }

  return (
    <View style={styles.container}>
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
              placeholder="Type here to translate!"
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
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          <DropDownPicker
            placeholder="How often?"
            style={{}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
      </View>

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
