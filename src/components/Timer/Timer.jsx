import { StyleSheet, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

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
});

export const Timer = ({ duration, setTimeDuration }) => {
  const colors = ["#004777", "#F7B801", "#A30000", "#A30000"];
  const colorPercentages = colors.map(
    (color, index) => (index + 1) / colors.length,
  );

  const colorsTime = colorPercentages.map(
    (percentage) => duration * (1 - percentage),
  );

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={colors}
        colorsTime={colorsTime}
        size={400}
        strokeWidth={40}
        onUpdate={(elapsedTime) => {
          setTimeDuration(elapsedTime);
        }}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </View>
  );
};
