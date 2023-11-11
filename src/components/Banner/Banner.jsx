import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { FadeIn } from "../FadeIn/FadeIn";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  banner: {
    backgroundColor: "black",
    padding: 20,

    width: "100%",
  },
  text: {
    fontSize: 120,
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
    top: "20%",
    left: -800,
    zIndex: 1,
    width: 2000,
  },
  animContainerStatus: {
    position: "absolute",
    bottom: "10%",
    right: "10%",
    zIndex: 1,
  },
});

export const Banner = ({ correct, answer, visible, onClose, problem }) => {
  const handlePress = () => {
    if (visible) {
      onClose();
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.animContainer}>
            <FadeIn duration={100}>
              <LottieView
                source={require(
                  correct
                    ? "../../../assets/animations/celebrate.json"
                    : "../../../assets/animations/icecreamfail.json",
                )}
                loop
                autoPlay
              />
            </FadeIn>
          </View>
          <View style={styles.animContainerStatus}>
            <FadeIn duration={100}>
              <LottieView
                source={require(
                  correct
                    ? "../../../assets/animations/correct.json"
                    : "../../../assets/animations/incorrect.json",
                )}
                loop
                autoPlay
              />
            </FadeIn>
          </View>
          <View style={styles.banner}>
            <Text style={styles.text}>
              {correct ? (
                <>
                  <Text style={styles.textCorrect}>Correct! </Text>
                  <Text>{`${problem[0]} X ${problem[1]} = ${answer}`}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.textIncorrect}>Incorrect. </Text>
                  <Text>{`${problem[0]} X ${problem[1]} = ${answer}`}</Text>
                </>
              )}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
