import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import LottieView from "lottie-react-native";
import { FadeIn } from "../FadeIn/FadeIn";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    fontSize: 140,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    position: "absolute",
    top: 300,
    left: 400,
    borderRadius: "50%",
  },
  animContainer: {
    position: "absolute",
    top: 300,
    left: -260,
  },
});

export const Timer = ({ duration, setTimeDuration }) => {
  const colors = ["#004777", "#F7B801", "#A30000", "#A30000"];
  const [showLottie, setShowLottie] = useState(false);
  const colorPercentages = colors.map(
    (color, index) => (index + 1) / colors.length,
  );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLottie(true);
    }, remainingTimeHalfway * 1000); // Convert seconds to milliseconds

    return () => clearTimeout(timeoutId); // Cleanup on component unmount or re-render
  }, [remainingTimeHalfway]);

  const colorsTime = colorPercentages.map(
    (percentage) => duration * (1 - percentage),
  );

  const remainingTimeHalfway = duration / 2;

  return (
    <>
      {showLottie && (
        <View style={styles.animContainer}>
          <FadeIn duration={1000}>
            <LottieView
              source={require("../../../assets/animations/runningTime.json")}
              loop
              autoPlay
            />
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
            // Handle completion if needed
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
