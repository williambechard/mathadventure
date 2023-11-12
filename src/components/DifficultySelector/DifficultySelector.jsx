import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { RadioButton } from "react-native-paper";
import { Audio } from "expo-av";
import clickAudio from "../../../assets/sound/click3.mp3";

import { responsiveSize } from "../helper-functions.js";
const useStyles = () => {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    text: {
      color: "rgb(0, 150, 136)",
      fontSize: responsiveSize(14, width, height),
      fontWeight: "bold",
    },
    radioText: {
      fontSize: responsiveSize(14, width, height),
      fontWeight: "bold",
      padding: responsiveSize(10, width, height),
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      margin: responsiveSize(10, width, height),
      flex: 1,
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-start",
      height: responsiveSize(50, width, height),
      padding: responsiveSize(4, width, height),
    },
  });
};
export const DifficultySelector = ({ onSelectDifficulty }) => {
  const [difficulty, setDifficulty] = useState(20);
  const [sound, setSound] = useState();
  const styles = useStyles();
  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(clickAudio);
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
  const handleDifficultyChange = (value) => {
    playSound();
    setDifficulty(value);
    onSelectDifficulty(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Difficulty:</Text>
      <RadioButton.Group
        onValueChange={handleDifficultyChange}
        value={difficulty}
      >
        <View style={styles.row}>
          <RadioButton value={20} />
          <Text style={styles.radioText}>Easy - 20s Timer</Text>
        </View>
        <View style={styles.row}>
          <RadioButton value={12} />
          <Text style={styles.radioText}>Med - 12s Timer</Text>
        </View>
        <View style={styles.row}>
          <RadioButton value={6} />
          <Text style={styles.radioText}>Hard - 6s Timer</Text>
        </View>
      </RadioButton.Group>
    </View>
  );
};

export default DifficultySelector;
