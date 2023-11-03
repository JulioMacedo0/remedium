import { Pressable, StyleSheet, TextInput } from "react-native";

import { View, Text } from "@/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

import { useTheme } from "@/context";
export default function Add() {
  const { theme } = useTheme();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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

  const hour = date.getHours.toString().padStart(2, "0");

  return (
    <View style={styles.container}>
      <Pressable
        style={{
          width: "80%",
        }}
        onPress={showDatepicker}
      >
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

      <Pressable
        style={{
          width: "80%",
        }}
        onPress={showTimepicker}
      >
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
          defaultValue={`${date.getHours().toString().padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}`}
        />
      </Pressable>

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
  container: {
    alignItems: "center",
    flex: 1,
  },
});
