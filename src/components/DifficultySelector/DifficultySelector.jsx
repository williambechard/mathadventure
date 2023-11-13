import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { RadioButton } from "react-native-paper";
import { Audio } from "expo-av";
import clickAudio from "../../../assets/sound/click3.mp3";

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    text: {
      color: "rgb(0, 150, 136)",
      fontSize: "8vw",
      fontWeight: "bold",
    },
    centerText: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    radioText: {
      fontSize: "6vw",
      fontWeight: "bold",
      padding: "4%",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-start",
      height: "18vw",
      width: "100%",
      padding: "1%",
      flex: 1,
    },
    radioGroup: {
      width: "100%",
      justifyContent: "space-evenly",
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
      <View style={styles.radioGroup}>
        <RadioButton.Group
          onValueChange={handleDifficultyChange}
          value={difficulty}
        >
          <View style={styles.row}>
            <View style={styles.centerText}>
              <RadioButton.Item
                value={20}
                label="Easy - 20s"
                labelStyle={{ fontSize: "6vw" }}
                position={"leading"}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.centerText}>
              <RadioButton.Item
                value={12}
                label="Med - 12s"
                labelStyle={{ fontSize: "6vw" }}
                position={"leading"}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.centerText}>
              <RadioButton.Item
                value={6}
                label="Hard - 6s"
                labelStyle={{ fontSize: "6vw" }}
                position={"leading"}
              />
            </View>
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default DifficultySelector;
