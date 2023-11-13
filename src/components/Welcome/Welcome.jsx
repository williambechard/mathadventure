import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, Text, Pressable } from "react-native";
import { FadeIn } from "../FadeIn/FadeIn";
import { Audio } from "expo-av";
import buttonSound from "../../../assets/sound/button.mp3";
import { responsiveSize } from "../helper-functions.js";
import { useWindowDimensions } from "react-native";
import { StartButton } from "../StartButton/StartButton";

const useStyles = () => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: "rgba(0,0,0,.85)",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "absolute",
      zIndex: 1,
    },
    innerContainer: {
      opacity: 1,
      width: "80%",
      height: "80%",
      backgroundColor: "black",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
    },
    content: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      gap: "1%",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: "14vw",
      margin: "1%",
      color: "white",
    },
    button: {
      width: "90%",
      height: "20%",
      margin: "2%",
      backgroundColor: "rgb(0, 150, 136)",
      borderRadius: 15,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: "4vw",
      padding: "10%",
      color: "white",
    },
  });
};
export const Welcome = ({ onPress, setGameState, setDuration }) => {
  const [sound, setSound] = useState();
  const styles = useStyles();

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
      await sound.playAsync();
    } catch (err) {
      console.log("error playing sound", err);
    }
  };

  const handlePress = () => {
    playSound();
    setTimeout(() => {
      onPress();
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FadeIn duration={1000}>
          <View style={styles.content}>
            <Text style={styles.text}>Welcome</Text>
            <Pressable onPress={handlePress} style={styles.button}>
              <Text style={styles.buttonText}>Let's Play!</Text>
            </Pressable>
          </View>
        </FadeIn>
      </View>
    </View>
  );
};
