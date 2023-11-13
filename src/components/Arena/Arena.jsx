import React, { useEffect, useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import NumberTile from "../NumberTile/NumberTile";
import { responsiveSize } from "../helper-functions";
import { Timer } from "../Timer/Timer";
const useStyles = () => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "#E8E8E8",
      padding: "1%",
    },
    tile: {
      alignItems: "center",
      justifyContent: "center",
      height: "2vw",
      marginTop: "1.25vw",
      marginBottom: "2vw",
      padding: "1vw",
    },
    headerRow: {
      width: "100%",
      flexDirection: "row",
      backgroundColor: "rgb(0, 150, 136)",
      borderRadius: 15,
    },
  });
};

const Arena = ({
  selectedNumbers = [],
  gameState,
  setGameState,
  setSelectedNumbers,
  isCorrect = false,
  setChosenTiles,
  setTargetTile,
  duration,
  setTimeDuration,
}) => {
  const [randomTiles, setRandomTiles] = useState(null);
  const [tileState, setTileState] = useState(Array(100).fill(-1)); // Initialize with all zeros
  const [tileValues, setTileValues] = useState(Array(100).fill(0));
  const [selectedTileIndex, setSelectedTileIndex] = useState(null); // Index of the selected tile
  const [keyTiles, setKeyTiles] = useState([]);
  const [headerNumbers, setHeaderNumbers] = useState([]);
  const [headerNumbersState, setHeaderNumbersState] = useState([]);
  const [headerIndex, setHeaderIndex] = useState(-1);
  const styles = useStyles();
  const numberTileRefs = useRef([]); // Array to store NumberTile refs
  const gridSize = 13;
  const tilesPerRow = 13;

  useEffect(() => {
    switch (gameState) {
      case 0:
        setRandomTiles(null);
        setTileState(Array(gridSize * tilesPerRow).fill(-1)); // Reset tileState
        setTileValues(Array(gridSize * tilesPerRow).fill(0)); // Reset tileValues
        numberTileRefs.current = []; // Reset refs array
        break;
      case 1:
        setTimeout(() => {
          setNumberTiles();
        }, 500);
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

  const setNumberTiles = () => {
    const grid = [];

    for (let row = 0; row < gridSize; row++) {
      const rowNumbers = [];
      for (let col = 0; col < tilesPerRow; col++) {
        rowNumbers.push((col + row * tilesPerRow) % tilesPerRow); // Numbers in each column from 0 to 12
      }
      grid.push(rowNumbers);
    }

    numberTileRefs.current.forEach((tileRef, index) => {
      const row = index % gridSize; // Calculate the row based on the index
      const col = Math.floor(index / gridSize); // Calculate the column based on the index
      // console.log("row ", row, " col ", col);
      // Set a new numberText from the specific position in the rowNumbers array
      const newNumber = grid[row][col];
      tileRef.current.updateNumber(newNumber);

      // Set the corresponding tile value
      setTileValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = newNumber;
        return newValues;
      });
    });

    setGameState(2);
  };

  const pickRandomTiles = () => {
    const selectedTiles = [];
    const newTileState = [...tileState]; // Create a copy of the tileState
    const selNumbers = [];
    const selIndex = [];
    if (headerIndex !== -1)
      setHeaderNumbersState((prevHeaderNumbersState) => {
        const newHeaderNumbersState = [...prevHeaderNumbersState];
        newHeaderNumbersState[headerIndex] = 0;
        return newHeaderNumbersState;
      });
    while (selectedTiles.length < 1) {
      const randomIndex = Math.floor(Math.random() * tileState.length);
      const selColumn = randomIndex % tilesPerRow;
      console.log("selColumn ", selColumn);
      // Check if the tile at randomIndex is already selected
      if (!selectedTiles.some((tile) => tile.index === randomIndex)) {
        selectedTiles.push({
          number: flatListData[randomIndex],
          index: randomIndex,
        });
        newTileState[randomIndex] = 1; // Update tileState to 1
        selIndex.push(randomIndex);
        selNumbers.push(headerNumbers[selColumn]);
        setTargetTile(headerNumbers[selColumn]);
        setHeaderNumbersState((prevHeaderNumbersState) => {
          const newHeaderNumbersState = [...prevHeaderNumbersState];
          newHeaderNumbersState[selColumn] = 1;
          return newHeaderNumbersState;
        });
        setHeaderIndex(selColumn);
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

  // Use useEffect to update headerNumbers and headerNumbersState
  useEffect(() => {
    const repeatedNumbers = [];

    // Repeat selectedNumbers to fill all 13 slots
    while (repeatedNumbers.length < tilesPerRow) {
      repeatedNumbers.push(...selectedNumbers);
    }

    // Update headerNumbers and headerNumbersState
    setHeaderNumbers(repeatedNumbers);
    setHeaderNumbersState(Array(repeatedNumbers.length).fill(0));
  }, [selectedNumbers, tilesPerRow]);

  const generateHeaderRow = () => {
    const headerRow = [];
    for (let i = 0; i < tilesPerRow; i++) {
      headerRow.push(
        <NumberTile
          numberText={headerNumbers[i]}
          onHoverEffect={false}
          hideText={false}
          state={headerNumbersState[i]}
        />,
      );
    }
    return headerRow;
  };
  console.log("hnumstate ", headerNumbersState);
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {headerNumbers?.length > 0 ? generateHeaderRow() : null}
      </View>
      <FlatList
        data={flatListData}
        keyExtractor={keyExtractor}
        numColumns={tilesPerRow}
        renderItem={renderNumberTile}
        style={{ marginTop: "-2vw" }}
      />
      {gameState === 3 && (
        <Timer duration={duration} setTimeDuration={setTimeDuration} />
      )}
    </View>
  );
};

const renderNumberTile = ({ item, index }) => {
  const ref = useRef();

  // Use the ref for each NumberTile
  numberTileRefs.current[index] = ref;

  return (
    <NumberTile
      ref={ref}
      numberText={item}
      onHoverEffect={false}
      hideText={false}
      state={tileState[item]}
    />
  );
};
export default Arena;
