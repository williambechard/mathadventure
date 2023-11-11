import NumberToggle from "../NumberToggle/NumberToggle";
import NumbersSelector from "../NumbersSelector/NumbersSelector";
import { StyleSheet, View } from "react-native";
import Arena from "../Arena/Arena";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import { Timer } from "../Timer/Timer";
import { NumberEntry } from "../NumberEntry/NumberEntry";
import { useEffect, useState } from "react";

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
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [response, setResponse] = useState(null);
  const [isCorrect, SetIsCorrect] = useState(false);

  useEffect(() => {
    console.log("gamestate ", gameState);
    switch (gameState) {
      case 0:
        break;
      case 1:
        break;
    }
  }, [gameState]);

  return (
    <View style={styles.container}>
      <NumbersSelector setNumbers={setUsableNumbers} gameState={gameState} />
      <View style={styles.leftContainer}>
        <Arena
          selectedNumbers={usableNumbers}
          gameState={gameState}
          setGameState={setGameState}
          setSelectedNumbers={setSelectedNumbers}
          isCorrect={isCorrect}
        />
        {gameState === 3 && (
          <Timer duration={20} setTimeDuration={setTimeDuration} />
        )}
        <View style={styles.rightContainer}>
          <ChallengeCard
            gameState={gameState}
            setGameState={setGameState}
            usableNumbers={usableNumbers}
            selectedNumbers={selectedNumbers}
            response={response}
            setIsCorrect={SetIsCorrect}
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
