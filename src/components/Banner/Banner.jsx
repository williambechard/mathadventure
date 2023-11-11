import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

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
