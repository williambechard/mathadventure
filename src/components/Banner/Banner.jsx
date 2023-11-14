import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { FadeIn } from "../FadeIn/FadeIn";
import LottieView from "lottie-react-native";
import celebrateAnimation from "../../../assets/animations/celebrate.json";
import icecreamfailAnimation from "../../../assets/animations/icecreamfail.json";
import correctAnimation from "../../../assets/animations/correct.json";
import incorrectAnimation from "../../../assets/animations/incorrect.json";

import { responsiveSize } from "../helper-functions.js";
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

export const Banner = ({
  correct,
  answer,
  visible,
  onClose,
  problem,
  mathOperator,
}) => {
  const styles = useStyles();
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
                source={correct ? celebrateAnimation : icecreamfailAnimation}
                loop
                autoPlay
              />
            </FadeIn>
          </View>
          <View
            style={[
              styles.animContainerStatus,
              !correct ? { width: "40vw", height: "40vw" } : {},
            ]}
          >
            <FadeIn duration={100}>
              <LottieView
                source={correct ? correctAnimation : incorrectAnimation}
                loop
                autoPlay
              />
            </FadeIn>
          </View>
          <View style={styles.banner}>
            <Text style={styles.text}>
              {correct ? (
                <View
                  style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.textCorrect, { width: "100%" }]}>
                    Correct!{" "}
                  </Text>
                  <Text>{`${problem[0]} ${mathOperator} ${problem[1]} = ${answer}`}</Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.textIncorrect, { width: "100%" }]}>
                    Incorrect.
                  </Text>
                  <Text>{`${problem[0]} ${mathOperator} ${problem[1]} = ${answer}`}</Text>
                </View>
              )}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
