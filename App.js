import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NumberToggle from "./src/components/NumberToggle/NumberToggle";
import GamePage from "./src/components/GamePage/GamePage";

export default function App() {
  return (
    <View style={styles.container}>
      <GamePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
