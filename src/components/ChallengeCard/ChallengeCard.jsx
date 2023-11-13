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
      height: "10vw",
      backgroundColor: "#C0C0C0",
      alignItems: "center",
      flexDirection: "row",
    },
    leftContainer: {
      flex: 1,
    },
    rightContainer: {
      flex: 1,
    },
    middleContainer: {
      width: "50%",
      flexDirection: "row",
    },
    container: {
      width: "8vw",
      height: "8vw",
      backgroundColor: "#E8E8E8",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "1%",
      borderRadius: 15,
    },
    mainText: {
      fontSize: "8vw",
      padding: "2%",
    },
    text: {
      color: "black",
      fontSize: "6vw",
      padding: "2%",
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    pressable: {
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
        <>
          <View style={styles.leftContainer} />
          <View style={styles.middleContainer}>
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
          <View style={styles.rightContainer} />
        </>
      )}
    </View>
  );
};

export default ChallengeCard;
