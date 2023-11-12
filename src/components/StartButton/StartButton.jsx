import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import DifficultySelector from "../DifficultySelector/DifficultySelector";
import buttonSound from "../../../assets/sound/button.mp3";

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
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
export const StartButton = ({
  pressHandler,
  isDisabled = false,
  setDuration,
}) => {
  const [isHovered, setHovered] = useState(false);
  const [sound, setSound] = useState();

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
        style={isDisabled ? styles.disabled : {}}
      >
        <View style={[styles.container, isHovered && styles.containerHovered]}>
          <Text style={styles.text}>Start</Text>
        </View>
      </Pressable>
      <DifficultySelector onSelectDifficulty={handleDifficultySelect} />
    </View>
  );
};
