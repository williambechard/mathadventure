import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

const styles = StyleSheet.create({
  containerHovered: {
    backgroundColor: "#DAF7A6",
  },
  container: {
    width: 400,
    height: 140,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: 10,
    borderRadius: 15,
    border: "4px solid rgb(0, 150, 136)",
    boxShadow: "0 0 10px grey",
  },
  text: {
    color: "rgb(0, 150, 136)",
    fontSize: 72,
    padding: 1,
  },
  disabled: {
    opacity: 0.25,
  },
});
export const StartButton = ({ pressHandler, isDisabled = false }) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!isDisabled) setHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isDisabled) setHovered(false);
  };

  return (
    <Pressable
      onPress={pressHandler}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={isDisabled}
      style={isDisabled ? styles.disabled : {}}
    >
      <View style={[styles.container, isHovered && styles.containerHovered]}>
        <Text style={styles.text}>Start</Text>
      </View>
    </Pressable>
  );
};
