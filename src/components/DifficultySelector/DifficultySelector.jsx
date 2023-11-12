import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { Audio } from "expo-av";
import clickAudio from "../../../assets/sound/click3.mp3";

const styles = StyleSheet.create({
  text: {
    color: "rgb(0, 150, 136)",
    fontSize: 22,
    fontWeight: "bold",
  },
  radioText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    justifyContent: "flex-start",
    margin: 20,
  },
  row: {
    width: 200,
    padding: 4,
  },
});
export const DifficultySelector = ({ onSelectDifficulty }) => {
  const [difficulty, setDifficulty] = useState(20);
  const [sound, setSound] = useState();

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
          <Text style={styles.radioText}>
            <RadioButton value={20} />
            Easy - 20s Timer
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.radioText}>
            <RadioButton value={12} />
            Medium - 12s Timer
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.radioText}>
            <RadioButton value={6} />
            Hard - 6s Timer
          </Text>
        </View>
      </RadioButton.Group>
    </View>
  );
};

export default DifficultySelector;
