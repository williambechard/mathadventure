import NumberToggle from "../NumberToggle/NumberToggle";
import NumbersSelector from "../NumbersSelector/NumbersSelector";
import { StyleSheet, View } from "react-native";
import Arena from "../Arena/Arena";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import { Timer } from "../Timer/Timer";
import { NumberEntry } from "../NumberEntry/NumberEntry";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Welcome } from "../Welcome/Welcome";
import musicTrack from "../../../assets/music/spring.mp3";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    flexDirection: "column",
  },
  leftContainer: {
    width: "99%",
    height: "85%",
    flexDirection: "row",
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "39.5%",
    gap: 10,
  },
});

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

  async function playSound() {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(musicTrack);
      await sound.playAsync({ isLooping: true }); // Add isLooping: true
    } catch (err) {
      console.log("error ", err);
    }
  }

  useEffect(() => {
    switch (gameState) {
      case 0:
        break;
      case 1:
        break;
      case 4:
        break;
      case 5:
        updateProgress(chosenTiles[0], isCorrect);
        break;
    }
    console.log("gamestate ", gameState);
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
    playSound();
    setShowWelcome(false);
  };

  return (
    <View style={styles.container}>
      {showWelcome && <Welcome onPress={handleWelcomePress} />}
      <NumbersSelector
        setNumbers={setUsableNumbers}
        gameState={gameState}
        status={progress}
        targetTile={targetTile}
      />
      <View style={styles.leftContainer}>
        <Arena
          selectedNumbers={usableNumbers}
          gameState={gameState}
          setGameState={setGameState}
          setSelectedNumbers={setSelectedNumbers}
          isCorrect={isCorrect}
          setChosenTiles={SetChosenTiles}
          setTargetTile={setTargetTile}
        />
        {gameState === 3 && (
          <Timer duration={duration} setTimeDuration={setTimeDuration} />
        )}
        <View style={styles.rightContainer}>
          <ChallengeCard
            gameState={gameState}
            setGameState={setGameState}
            usableNumbers={usableNumbers}
            selectedNumbers={selectedNumbers}
            response={response}
            setIsCorrect={SetIsCorrect}
            setDuration={setDuration}
          />
          <NumberEntry
            gameState={gameState}
            setGameState={setGameState}
            setResponse={setResponse}
          />
        </View>
      </View>
    </View>
  );
};

export default GamePage;
