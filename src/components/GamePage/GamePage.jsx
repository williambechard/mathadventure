import NumbersSelector from "../NumbersSelector/NumbersSelector";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Arena from "../Arena/Arena";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import { NumberEntry } from "../NumberEntry/NumberEntry";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Welcome } from "../Welcome/Welcome";
import menuMusicTrack from "../../../assets/music/spring.mp3";
import multiplicationMusicTrack from "../../../assets/music/multiplication.mp3";
import additionMusicTrack from "../../../assets/music/upbeat.mp3";
import { StartButton } from "../StartButton/StartButton";
import { EndGame } from "../EndGame/EndGame";

const useStyles = () => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: "white",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "row",
    },
    leftContainer: {
      width: "20%",
      height: "100%",
      flexDirection: "row",
    },
    rightContainer: {
      flexDirection: "column",
      justifyContent: "flex-start",
      height: "100%",
      flex: 2,
    },
    arenaArea: {
      height: "52%",
    },
    entryArea: {
      flex: 1,
    },
  });
};

export const calculationResult = (numbers, target) => {
  let result;
  switch (target) {
    case "*":
      result = numbers.reduce((acc, curr) => acc * curr);
      break;
    case "+":
      result = numbers.reduce((acc, curr) => acc + curr);
      break;
    case "-":
      result = numbers.reduce((acc, curr) => acc - curr);
      break;
    case "/":
      result = numbers.reduce((acc, curr) => acc / curr);
      break;
  }

  return result;
};

const GamePage = () => {
  const [usableNumbers, setUsableNumbers] = useState(null);
  const [gameState, setGameState] = useState(0);
  const [timeDuration, setTimeDuration] = useState(null);
  const [duration, setDuration] = useState(20); // [seconds, setSeconds
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [response, setResponse] = useState(null);
  const [isCorrect, SetIsCorrect] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [chosenTiles, SetChosenTiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [targetTile, setTargetTile] = useState(null);
  const [arithmaticFunctionIndex, setArithmaticFunctionIndex] = useState(0);
  const [sound, setSound] = useState(new Audio.Sound());

  const arithmaticFunctions = ["+", "*"]; // - and / take special considerations to not be - or have fractions
  const styles = useStyles();

  async function playSound(track) {
    try {
      // Unload the previous sound before loading a new one
      await sound.unloadAsync();
      // Load and play the new sound
      await sound.loadAsync(track);
      await sound.setIsLoopingAsync(true);
      await sound.playAsync();
    } catch (err) {
      console.error("Error playing sound", err);
    }
  }

  useEffect(() => {
    return () => {
      // Clean up resources when the component unmounts
      sound.unloadAsync();
    };
  }, [sound]);

  useEffect(() => {
    switch (gameState) {
      case 0:
        setProgress({});
        SetChosenTiles([]);
        setTargetTile(null);
        playSound(menuMusicTrack);
        break;
      case 1:
        playSound(
          arithmaticFunctionIndex === 0
            ? multiplicationMusicTrack
            : additionMusicTrack,
        );
        break;
      case 4:
        break;
      case 5:
        updateProgress(chosenTiles[0], isCorrect);
        break;
    }
  }, [gameState]);

  const updateProgress = (key, isCorrect) => {
    setProgress((prevProgress) => {
      const updatedProgress = { ...prevProgress };

      // If the key (number) doesn't exist in the progress object, initialize it
      if (!updatedProgress[key]) {
        updatedProgress[key] = { correct: 0, incorrect: 0 };
      }

      // Update the correct or incorrect count based on the isCorrect value
      if (isCorrect) {
        updatedProgress[key].correct += 1;
      } else {
        updatedProgress[key].incorrect += 1;
      }

      return updatedProgress;
    });
  };

  const handleWelcomePress = () => {
    playSound(menuMusicTrack);
    setShowWelcome(false);
  };
  const handleStartPress = () => {
    setGameState(1);
  };
  return (
    <View style={styles.container}>
      {showWelcome && (
        <Welcome
          onPress={handleWelcomePress}
          setGameState={setGameState}
          setDuration={setDuration}
        />
      )}
      {gameState === 6 && <EndGame setGameState={setGameState} />}
      <View style={styles.leftContainer}>
        <NumbersSelector
          setNumbers={setUsableNumbers}
          gameState={gameState}
          status={progress}
          targetTile={targetTile}
          setGameState={setGameState}
        />
      </View>
      <View style={styles.rightContainer}>
        {gameState === 0 ? (
          <StartButton
            pressHandler={handleStartPress}
            setDuration={setDuration}
            isDisabled={!(usableNumbers?.length > 0)}
            setCalcIndex={setArithmaticFunctionIndex}
          />
        ) : (
          <>
            <View style={styles.arenaArea}>
              <Arena
                selectedNumbers={usableNumbers}
                gameState={gameState}
                setGameState={setGameState}
                setSelectedNumbers={setSelectedNumbers}
                isCorrect={isCorrect}
                setChosenTiles={SetChosenTiles}
                setTargetTile={setTargetTile}
                duration={duration}
                setTimeDuration={setTimeDuration}
              />
            </View>
            <View style={styles.entryArea}>
              <ChallengeCard
                gameState={gameState}
                setGameState={setGameState}
                usableNumbers={usableNumbers}
                selectedNumbers={selectedNumbers}
                response={response}
                setIsCorrect={SetIsCorrect}
                setDuration={setDuration}
                mathOperator={arithmaticFunctions[arithmaticFunctionIndex]}
              />
              <NumberEntry
                gameState={gameState}
                setGameState={setGameState}
                setResponse={setResponse}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};
export default GamePage;
