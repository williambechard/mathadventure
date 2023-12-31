import {
  Text,
  StyleSheet,
  Switch,
  View,
  useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import NumberToggle from "../NumberToggle/NumberToggle";
import { responsiveSize } from "../helper-functions";
import { Reset } from "../Reset/Reset";
const useStyles = () => {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      width: "6%",
      height: height,
      backgroundColor: "#E8E8E8",
      justifyContent: "space-evenly",
      alignItems: "stretch",
      flexDirection: "column",
      flex: 1,
      gap: "1%",
      padding: responsiveSize(10, width, height),
    },
  });
};
const NumbersSelector = ({
  setNumbers,
  gameState,
  status,
  targetTile,
  setGameState,
}) => {
  const [toggledNumbers, setToggledNumbers] = useState([]);
  const [allToggled, setAllToggled] = useState(false);
  const styles = useStyles();
  useEffect(() => {
    setNumbers(toggledNumbers);
  }, [toggledNumbers, setNumbers]);

  useEffect(() => {
    switch (gameState) {
      case 0:
        setToggledNumbers([]);
        setAllToggled(false);
        break;
    }
  }, [gameState]);

  const generateNumbers = () =>
    [...Array(13)].map((_, i) => {
      return (
        <NumberToggle
          gameState={gameState}
          key={i}
          numberText={i}
          isAllToggled={allToggled}
          setNumberToggle={(state) =>
            setToggledNumbers((prev) =>
              state ? [...prev, i] : prev.filter((num) => num !== i),
            )
          }
          isTarget={i === targetTile}
          numberStatus={status}
          isTracked
        />
      );
    });

  const toggleAll = () => {
    setAllToggled((prev) => !prev);
    setToggledNumbers(
      allToggled ? [] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    );
  };

  return (
    <View style={styles.container}>
      {gameState === 0 ? (
        <NumberToggle
          gameState={gameState}
          numberText={"All"}
          key={"All"}
          isAllToggled={allToggled}
          setNumberToggle={toggleAll}
        />
      ) : (
        <Reset setGameState={setGameState} />
      )}

      {generateNumbers()}
    </View>
  );
};

export default NumbersSelector;
