import {
  Text,
  StyleSheet,
  Switch,
  View,
  useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import { Audio } from "expo-av";
import clickSound from "../../../assets/sound/mech-click.mp3";
import { responsiveSize } from "../helper-functions.js";
const useStyles = () => {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    outerContainer: {
      flex: 1,
      flexDirection: "row",
      borderRadius: responsiveSize(10, width, height),
    },
    container: {
      backgroundColor: "#C0C0C0",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
      borderTopRightRadius: responsiveSize(10, width, height),
      borderBottomRightRadius: responsiveSize(10, width, height),
      flex: 1,
    },
    switch: {
      width: "90%",
      margin: "4%",
    },
    text: {
      fontSize: responsiveSize(20, width, height),
      padding: "10%",
      flex: 1,
    },
    textContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    switchOn: {
      backgroundColor: "#DAF7A6",
    },
    disabled: {
      opacity: 0.25,
    },
    progressContainer: {
      width: "3vw",
      height: responsiveSize(100, width, height),
      backgroundColor: "white",
      border: "2px solid grey",
      borderTopLeftRadius: responsiveSize(15, width, height),
      borderBottomLeftRadius: responsiveSize(15, width, height),
    },
    correctAmount: {
      height: "100%",
      backgroundColor: "green",
      borderTopLeftRadius: responsiveSize(15, width, height),
      borderBottomLeftRadius: responsiveSize(15, width, height),
    },
    stepContainer: {
      borderTopLeftRadius: responsiveSize(15, width, height),
      borderBottomLeftRadius: responsiveSize(15, width, height),
    },
    incorrectAmount: {
      width: "3vw",
      height: "80%",
      backgroundColor: "red",
      zIndex: 1,
      borderTopLeftRadius: responsiveSize(15, width, height),
      borderBottomLeftRadius: responsiveSize(15, width, height),
    },
  });
};
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
  const styles = useStyles();
  const trackedStatus = isTracked
    ? numberStatus[numberText] || { correct: 0, incorrect: 0 }
    : { correct: 0, incorrect: 0 };

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(clickSound);
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
        <View style={styles.textContainer}>
          <Text style={styles.text}>{numberText}</Text>
        </View>
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
