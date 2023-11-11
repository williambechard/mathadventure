import React, { useEffect, useState, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import NumberTile from "../NumberTile/NumberTile";

const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: "100%",
    paddingTop: 8,
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
  setChosenTiles,
  setTargetTile,
}) => {
  const [randomTiles, setRandomTiles] = useState(null);
  const [tileState, setTileState] = useState(Array(100).fill(-1)); // Initialize with all zeros
  const [tileValues, setTileValues] = useState(Array(100).fill(0));
  const [selectedTileIndex, setSelectedTileIndex] = useState(null); // Index of the selected tile
  const [keyTiles, setKeyTiles] = useState([]);

  const numberTileRefs = useRef([]); // Array to store NumberTile refs
  const gridSize = 10;
  const tilesPerRow = 10;

  useEffect(() => {
    const initialChosenTiles = [];
    let count = 0;
    if (selectedNumbers?.length > 0) {
      while (count < 100) {
        initialChosenTiles.push(...selectedNumbers);
        count += selectedNumbers.length;
      }
      setKeyTiles(initialChosenTiles.slice(0, 100));
    }
  }, [selectedNumbers]);

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
          if (isCorrect) {
            changeTileState(selectedTileIndex[0], 2);
          } else {
            changeTileState(selectedTileIndex[0], 3);
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
      return newTileState;
    });
  };

  const shuffleNumberTiles = () => {
    let shuffledNumbers = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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
        shuffledNumbers = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      }
    });
    setGameState(2);
  };

  const pickRandomTiles = () => {
    const selectedTiles = [];
    const newTileState = [...tileState]; // Create a copy of the tileState
    const selNumbers = [];
    const selIndex = [];

    //get a random index from keyTiles and pop it out of the array
    const randomKeyIndex = Math.floor(Math.random() * keyTiles.length);
    const randomKey = keyTiles[randomKeyIndex];
    keyTiles.splice(randomKeyIndex, 1);
    setTargetTile(randomKey); // <- a number of the target
    selNumbers.push(randomKey);
    while (selectedTiles.length < 1) {
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
    setSelectedTileIndex(selIndex);

    setSelectedNumbers(selNumbers);
    setChosenTiles(selNumbers);
    setTimeout(() => {
      setGameState(3);
    }, 500);
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
