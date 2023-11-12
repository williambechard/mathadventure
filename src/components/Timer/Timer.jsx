import React, { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import LottieView from "lottie-react-native";
import { FadeIn } from "../FadeIn/FadeIn";
import { Audio } from "expo-av";
import runningClockAnimation from "../../../assets/animations/runningTime.json";
import timerSound from "../../../assets/sound/timer.mp3";
import { responsiveSize } from "../helper-functions.js";
const useStyles = () => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      backgroundColor: "white",
      fontSize: responsiveSize(140, width, height),
      fontWeight: "bold",
      fontFamily: "sans-serif",
      position: "absolute",
      top: responsiveSize(70, width, height),
      left: responsiveSize(70, width, height),
      borderRadius: "50%",
      zIndex: 1,
    },
    animContainer: {
      position: "absolute",
      top: responsiveSize(110, width, height),
      left: responsiveSize(-280, width, height),
      zIndex: 2,
    },
  });
};

export const Timer = ({ duration, setTimeDuration }) => {
  const colors = ["#004777", "#F7B801", "#A30000", "#A30000"];
  const [showLottie, setShowLottie] = useState(false);
  const colorPercentages = colors.map(
    (color, index) => (index + 1) / colors.length,
  );
  const [sound, setSound] = useState();
  const styles = useStyles();
  useEffect(() => {
    let isMounted = true; // Variable to track if the component is mounted

    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(timerSound);
        setSound(sound);
      } catch (err) {
        console.log("error loading sound", err);
      }
    };

    loadSound();

    return () => {
      // Cleanup function
      isMounted = false; // Set to false on unmount

      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    if (sound != null) {
      playSound();
    }
  }, [sound]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLottie(true);
    }, remainingTimeHalfway * 1000);

    return () => {
      clearTimeout(timeoutId);
      setShowLottie(false);

      if (sound) {
        sound.stopAsync();
      }
    };
  }, [remainingTimeHalfway, sound]);

  const colorsTime = colorPercentages.map(
    (percentage) => duration * (1 - percentage),
  );
  const playSound = async () => {
    try {
      await sound.stopAsync(); // Stop the sound
      sound.setIsLoopingAsync(true);
      await sound.playAsync();
    } catch (err) {
      console.log("error playing sound", err);
    }
  };
  const remainingTimeHalfway = duration / 2;

  return (
    <>
      {showLottie && (
        <View style={styles.animContainer}>
          <FadeIn duration={1000}>
            <LottieView source={runningClockAnimation} loop autoPlay />
          </FadeIn>
        </View>
      )}
      <View style={styles.container}>
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          colors={colors}
          colorsTime={colorsTime}
          size={400}
          strokeWidth={40}
          onComplete={() => {
            sound.stopAsync();
          }}
          onUpdate={(elapsedTime) => {
            setTimeDuration(elapsedTime);
          }}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </View>
    </>
  );
};
