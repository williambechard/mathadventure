import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import DifficultySelector from "../DifficultySelector/DifficultySelector";
import buttonSound from "../../../assets/sound/button.mp3";
import { responsiveSize } from "../helper-functions.js";
import { ArithmeticSelector } from "../ArithmeticSelector/ArithmaticSelector";
const useStyles = () => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    containerHovered: {
      backgroundColor: "#DAF7A6",
    },
    container: {
      height: responsiveSize(140, width, height),
      backgroundColor: "rgb(218, 247, 166)",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: responsiveSize(10, width, height),
      borderRadius: responsiveSize(15, width, height),
      border: "4px solid rgb(0, 150, 136)",
      boxShadow: "0 0 10px grey",
    },
    wrapper: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    text: {
      color: "rgb(0, 150, 136)",
      fontSize: responsiveSize(72, width, height),
      padding: responsiveSize(1, width, height),
    },
    disabled: {
      opacity: 0.25,
    },
    selectors: {
      marginTop: "10vw",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

export const StartButton = ({
  pressHandler,
  isDisabled = false,
  setDuration,
  setCalcIndex,
}) => {
  const [isHovered, setHovered] = useState(false);
  const [sound, setSound] = useState();
  const styles = useStyles();
  const handleDifficultySelect = (difficulty) => {
    setDuration(difficulty);
    // Perform any other actions based on the selected difficulty
  };

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(buttonSound);
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

  const handlePress = () => {
    playSound();
    setTimeout(() => {
      pressHandler();
    }, 500);
  };

  const handleMouseEnter = () => {
    if (!isDisabled) setHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isDisabled) setHovered(false);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={handlePress}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={isDisabled}
        style={[{ flex: 2, width: "100%" }, isDisabled && styles.disabled]}
      >
        <View style={[styles.container, isHovered && styles.containerHovered]}>
          <Text style={styles.text}>Start</Text>
        </View>
      </Pressable>
      <View style={styles.selectors}>
        <DifficultySelector onSelectDifficulty={handleDifficultySelect} />
        <ArithmeticSelector setCalcIndex={setCalcIndex} />
      </View>
    </View>
  );
};
