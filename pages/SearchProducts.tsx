import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function SearchProducts() {
  const [routeMode, setRouteMode] = useState("driving");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Products</Text>

      <TextInput
        placeholder="Search products..."
        style={styles.input}
      />

      <View style={styles.buttonSpacing}>
        <Button title="Search" onPress={() => {}} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="View Shopping Cart" onPress={() => {}} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="Clear Cart" onPress={() => {}} />
      </View>

      <Text style={styles.label}>Route Type</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={routeMode}
          onValueChange={(itemValue) => setRouteMode(itemValue)}
        >
          <Picker.Item label="Driving" value="driving" />
          <Picker.Item label="Walking" value="walking" />
          <Picker.Item label="Cycling" value="cycling" />
        </Picker>
      </View>

      <View style={styles.buttonSpacing}>
        <Button
          title="Generate Shopping Trip"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  buttonSpacing: {
    marginBottom: 12,
  },
});