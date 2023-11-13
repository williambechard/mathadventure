import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { StartButton } from "../StartButton/StartButton";
import NumberTile from "../NumberTile/NumberTile";
import { Banner } from "../Banner/Banner";
import { Audio } from "expo-av";
import correctAudio from "../../../assets/sound/correct.mp3";
import incorrectAudio from "../../../assets/sound/incorrect.mp3";
import { responsiveSize } from "../helper-functions.js";
const useStyles = () => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    mainContainer: {
      height: responsiveSize(200, width, height),
      backgroundColor: "#C0C0C0",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
    },
    innerContainer: {
      height: responsiveSize(200, width, height),
      width: "100%",
      backgroundColor: "#C0C0C0",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "row",
    },
    container: {
      width: responsiveSize(140, width, height),
      height: responsiveSize(140, width, height),
      backgroundColor: "#E8E8E8",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: responsiveSize(60, width, height),
      borderRadius: responsiveSize(15, width, height),
    },
    mainText: {
      fontSize: responsiveSize(40, width, height),
      padding: responsiveSize(1, width, height),
    },
    text: {
      color: "black",
      fontSize: responsiveSize(100, width, height),
      padding: responsiveSize(1, width, height),
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

const ChallengeCard = ({
  gameState,
  setGameState,
  usableNumbers,
  selectedNumbers,
  response,
  setIsCorrect,
  setDuration,
}) => {
  const [soundCorrect, setSoundCorrect] = useState();
  const [soundWrong, setSoundWrong] = useState();
  const styles = useStyles();
  const num1Ref = useRef();
  const num2Ref = useRef();
  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(correctAudio);
        setSoundCorrect(sound);
        const { sound: sound2 } = await Audio.Sound.createAsync(incorrectAudio);
        setSoundWrong(sound2);
      } catch (err) {
        console.log("error loading sound", err);
      }
    };

    loadSound(); // Load sound when component mounts

    return () => {
      // Cleanup: unload the sound when the component unmounts
      if (soundCorrect) {
        soundCorrect.unloadAsync();
      }
      if (soundWrong) {
        soundWrong.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    switch (gameState) {
      case 4:
        playSound();
        break;
    }
  }, [gameState]);

  const playSound = async () => {
    const soundToPlay =
      response === selectedNumbers[0] * selectedNumbers[1]
        ? soundCorrect
        : soundWrong;
    try {
      await soundToPlay.stopAsync(); // Stop the sound
      await soundToPlay.playAsync();
    } catch (err) {
      console.log("error playing sound", err);
    }
  };

  const [answer, setAnswer] = useState(0);
  useEffect(() => {
    setAnswer(selectedNumbers[0] * selectedNumbers[1]);
    setIsCorrect(response === selectedNumbers[0] * selectedNumbers[1]);
  }, [response]);

  const handleSubmitAnswer = () => {
    setGameState(5);
  };

  useEffect(() => {
    num1Ref.current?.updateNumber(selectedNumbers[0] ?? "");
    num2Ref.current?.updateNumber(selectedNumbers[1] ?? "");
  }, [selectedNumbers]);

  return gameState === 4 ? (
    <Banner
      correct={response === selectedNumbers[0] * selectedNumbers[1]}
      answer={answer}
      problem={selectedNumbers}
      onClose={handleSubmitAnswer}
    />
  ) : (
    <View style={styles.mainContainer}>
      {gameState === 0 ? null : (
        <View style={styles.innerContainer}>
          <NumberTile
            ref={num1Ref}
            numberText={num1Ref.current?.state?.numberText ?? ""}
            customStyles={styles}
            onHoverEffect={false}
            hideText={selectedNumbers.length === 0}
          />
          <Text style={styles.mainText}>X</Text>
          <NumberTile
            ref={num2Ref}
            numberText={num2Ref.current?.state?.numberText ?? ""}
            customStyles={styles}
            onHoverEffect={false}
            hideText={selectedNumbers.length === 0}
          />
        </View>
      )}
    </View>
  );
};

export default ChallengeCard;
