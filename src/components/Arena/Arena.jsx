import React, { useEffect, useState, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import NumberTile from "../NumberTile/NumberTile";

const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: "100%",
    backgroundColor: "#E8E8E8",
  },
  rowContainer: {
    flexDirection: "row",
    height: 100,
  },
  tile: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    marginTop: 4,
    marginBottom: 2,
  },
});

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Arena = ({
  selectedNumbers = [],
  gameState,
  setGameState,
  setSelectedNumbers,
  isCorrect = false,
}) => {
  const [randomTiles, setRandomTiles] = useState(null);
  const [tileState, setTileState] = useState(Array(100).fill(-1)); // Initialize with all zeros
  const [tileValues, setTileValues] = useState(Array(100).fill(0));
  const [selectedTileIndex, SetSelectedTileIndex] = useState(null); // Index of the selected tile
  const numberTileRefs = useRef([]); // Array to store NumberTile refs
  const gridSize = 10;
  const tilesPerRow = 10;

  useEffect(() => {
    switch (gameState) {
      case 0:
        setRandomTiles(null);
        setTileState(Array(100).fill(-1)); // Reset tileState
        setTileValues(Array(100).fill(0)); // Reset tileValues
        numberTileRefs.current = []; // Reset refs array
        break;
      case 1:
        shuffleNumberTiles();
        break;
      case 2:
        setRandomTiles(pickRandomTiles(selectedNumbers));
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        if (selectedTileIndex?.length) {
          console.log("isCorrect ", isCorrect);
          //determine if we got the answer right
          if (isCorrect) {
            changeTileState(selectedTileIndex[0], 2);
            changeTileState(selectedTileIndex[1], 2);
          } else {
            changeTileState(selectedTileIndex[0], 3);
            changeTileState(selectedTileIndex[1], 3);
          }
        }
        setGameState(2);
        break;
      default:
        break;
    }
  }, [gameState]);

  const changeTileState = (index, state) => {
    setTileState((prevTileState) => {
      const newTileState = [...prevTileState];
      newTileState[index] = state;
      console.log(`Changing tile state for index ${index} to ${state}`);
      return newTileState;
    });
  };

  const shuffleNumberTiles = () => {
    let shuffledNumbers = shuffleArray(selectedNumbers);

    numberTileRefs.current.forEach((tileRef, index) => {
      // Set a new random numberText from the shuffledNumbers array
      const newNumber = shuffledNumbers.pop();
      tileRef.current.updateNumber(newNumber);

      // Set the corresponding tile value
      setTileValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = newNumber;
        return newValues;
      });

      if (shuffledNumbers.length === 0) {
        shuffledNumbers = shuffleArray(selectedNumbers);
      }
    });
    setGameState(2);
  };

  const pickRandomTiles = () => {
    const selectedTiles = [];
    const newTileState = [...tileState]; // Create a copy of the tileState
    const selNumbers = [];
    const selIndex = [];

    while (selectedTiles.length < 2) {
      const randomIndex = Math.floor(Math.random() * tileState.length);

      // Check if the tile at randomIndex is already selected
      if (!selectedTiles.some((tile) => tile.index === randomIndex)) {
        selectedTiles.push({
          number: flatListData[randomIndex],
          index: randomIndex,
        });
        newTileState[randomIndex] = 1; // Update tileState to 1
        selIndex.push(randomIndex);
        selNumbers.push(tileValues[randomIndex]);
      }
    }
    SetSelectedTileIndex(selIndex);
    setSelectedNumbers(selNumbers);
    setGameState(3);
    setTileState(newTileState); // Update the tileState

    return selectedTiles;
  };

  const renderNumberTile = ({ item, index }) => {
    const ref = React.createRef();
    numberTileRefs.current[index] = ref;

    return (
      <View style={[styles.tile, tileStyle]}>
        <NumberTile
          ref={ref}
          numberText={item}
          onHoverEffect={false}
          hideText={false}
          state={tileState[index]}
        />
      </View>
    );
  };

  const keyExtractor = (_, index) => String(index);

  const flatListData = Array.from(
    { length: gridSize * tilesPerRow },
    (_, index) => index,
  );

  const tileStyle = {
    flexBasis: `${100 / tilesPerRow}%`,
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={flatListData}
        keyExtractor={keyExtractor}
        numColumns={tilesPerRow}
        renderItem={renderNumberTile}
      />
    </View>
  );
};
const renderNumberTile = ({ item, index }) => {
  const ref = useRef();

  // Use the ref for each NumberTile
  numberTileRefs.current[index] = ref;

  return (
    <View style={[styles.tile, tileStyle]}>
      <NumberTile
        ref={ref}
        numberText={item}
        onHoverEffect={false}
        hideText={false}
        state={tileState[item]}
      />
    </View>
  );
};
export default Arena;
