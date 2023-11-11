import { Text, StyleSheet, Switch, View } from "react-native";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: "#C0C0C0",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    margin: 10,
    borderRadius: 15,
  },
  switch: {
    height: 30,
    width: 80,
    margin: 4,
  },
  text: {
    fontSize: 40,
    padding: 1,
  },
  switchOn: {
    backgroundColor: "#DAF7A6",
  },
  disabled: {
    opacity: 0.25,
  },
});

const NumberToggle = ({
  numberText,
  setNumberToggle,
  isAllToggled,
  gameState,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(isAllToggled);
  }, [isAllToggled]);

  const toggleSwitch = () => {
    if (gameState === 0) {
      setIsEnabled((previousState) => !previousState);
      setNumberToggle(!isEnabled);
    }
  };

  return (
    <View
      style={[
        styles.container,
        isEnabled && styles.switchOn,
        gameState !== 0 && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{numberText}</Text>
      <Switch
        style={styles.switch}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default NumberToggle;
