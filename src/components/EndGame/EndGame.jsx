import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Button,
} from "react-native";
import { FadeIn } from "../FadeIn/FadeIn";
import LottieView from "lottie-react-native";
import celebrateAnimation from "../../../assets/animations/celebrate.json";
import icecreamfailAnimation from "../../../assets/animations/icecreamfail.json";

const useStyles = () => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    },
    banner: {
      backgroundColor: "black",
      padding: "2%",
      width: "100%",
    },
    text: {
      fontSize: "12vw",
      color: "white",
      textAlign: "center",
    },
    textCorrect: {
      color: "green",
    },
    textIncorrect: {
      color: "red",
    },
    animContainer: {
      position: "absolute",
      top: "50%",
      left: "-100vw",
      zIndex: 1,
      width: "200vw",
    },
    animContainerStatus: {
      position: "absolute",
      bottom: "0%",
      right: "0%",
      zIndex: 1,
    },
  });
};

export const EndGame = ({ setGameState }) => {
  const styles = useStyles();
  const handlePress = () => {
    setGameState(0);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={handlePress}
    >
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          <View style={styles.animContainer}>
            <FadeIn duration={100}>
              <LottieView source={celebrateAnimation} loop autoPlay />
            </FadeIn>
          </View>
          <View style={styles.banner}>
            <Text style={styles.text}>
              <View
                style={{
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.textCorrect, { width: "100%" }]}>
                  Congrats!
                </Text>
                <Text> You did it!</Text>
                <Button onPress={handlePress} title={"Retry"} />
              </View>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
