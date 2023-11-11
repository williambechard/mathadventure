import { Text, StyleSheet, Switch, View } from "react-native";
import { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import { Audio } from "expo-av";

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    margin: 10,
    borderRadius: 20,
  },
  container: {
    width: 100,
    height: 100,
    backgroundColor: "#C0C0C0",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
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
  progressContainer: {
    width: 20,
    height: 100,
    backgroundColor: "white",
    border: "2px solid grey",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  correctAmount: {
    height: "100%",
    backgroundColor: "green",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  stepContainer: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  incorrectAmount: {
    width: 20,
    height: "80%",
    backgroundColor: "red",
    zIndex: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

const NumberToggle = ({
  numberText,
  setNumberToggle,
  isAllToggled,
  gameState,
  isTracked = false,
  numberStatus,
  isTarget = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [sound, setSound] = useState();

  const trackedStatus = isTracked
    ? numberStatus[numberText] || { correct: 0, incorrect: 0 }
    : { correct: 0, incorrect: 0 };

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../../../assets/sound/mech-click.mp3"),
        );
        setSound(sound);
      } catch (err) {
        console.log("error loading sound", err);
      }
    };

    loadSound(); // Load sound when component mounts

    return () => {
      // Cleanup: unload the sound when the component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    try {
      await sound.stopAsync(); // Stop the sound
      await sound.playAsync();
    } catch (err) {
      console.log("error playing sound", err);
    }
  };

  useEffect(() => {
    setIsEnabled(isAllToggled);
  }, [isAllToggled]);

  const toggleSwitch = () => {
    if (gameState === 0) {
      playSound();
      setIsEnabled((previousState) => !previousState);
      setNumberToggle(!isEnabled);
    }
  };

  const incorrectPercentage =
    (trackedStatus.incorrect /
      (trackedStatus.correct + trackedStatus.incorrect)) *
    100;

  return (
    <View
      style={[
        styles.outerContainer,
        isTarget && { border: "4px solid limegreen" },
      ]}
    >
      {isTracked && (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={[
              styles.correctAmount,
              (!isEnabled ||
                (trackedStatus.correct === 0 &&
                  trackedStatus.incorrect === 0)) && {
                backgroundColor: "grey",
              },
            ]}
          >
            <View
              style={[
                styles.incorrectAmount,
                { height: `${incorrectPercentage}%` },
              ]}
            ></View>
          </View>
        </View>
      )}
      <View
        style={[
          styles.container,
          isEnabled && styles.switchOn,
          gameState !== 0 && styles.disabled,
          !isTracked && { borderTopLeftRadius: 15, borderBottomLeftRadius: 15 },
        ]}
      >
        <Text style={styles.text}>{numberText}</Text>
        <Switch
          style={styles.switch}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export default NumberToggle;
