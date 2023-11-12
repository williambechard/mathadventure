import { useEffect, useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import { FadeIn } from "../FadeIn/FadeIn";
import { Audio } from "expo-av";
import buttonSound from "../../../assets/sound/button.mp3";
import { responsiveSize } from "../helper-functions.js";
import { useWindowDimensions } from "react-native";

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
    text: {
      fontSize: responsiveSize(120, width, height),
      margin: responsiveSize(40, width, height),
      color: "white",
    },
    btn: {},
  });
};
export const Welcome = ({ onPress }) => {
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
          <Text style={styles.text}>Welcome!</Text>
          <View style={styles.btn}>
            <Button
              type={"Submit"}
              title={`Let's Play!`}
              onPress={handlePress}
            />
          </View>
        </FadeIn>
      </View>
    </View>
  );
};
