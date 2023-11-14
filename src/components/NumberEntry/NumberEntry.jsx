import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import NumberTile from "../NumberTile/NumberTile";
import { Banner } from "../Banner/Banner";
import { Audio } from "expo-av";
import clickSound from "../../../assets/sound/mech-click.mp3";
import { responsiveSize } from "../helper-functions.js";
const useStyles = () => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: "#C0C0C0",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
      flexWrap: "wrap",
    },
    mainText: {
      fontSize: "10vw",
      padding: "1%",
    },
    container: {
      backgroundColor: "#E8E8E8",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: 15,
      height: "100%",
    },
    text: {
      fontSize: "6vw",
      padding: "1%",
    },
    rowContainer: {
      flexDirection: "row",
      flexWrap: "nowrap",
      width: "100%",
      flex: 2,
      padding: "1%",
      height: "6vw",
      justifyContent: "center",
      gap: "2%",
    },
    numberDisplay: {
      backgroundColor: "#AFAFAF",
      flex: 1,
      height: "100%",
      borderRadius: 15,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    disabled: {
      opacity: 0.25,
      width: "10vw",
      height: "12vw",
      backgroundColor: "#E8E8E8",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: 15,
    },
    outerContainer: {
      flex: 1,
    },
  });
};
const displayStyle = () => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      height: "10vw",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "rgb(0,150,136)",
      fontSize: "8vw",
    },
    pressable: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

export const NumberEntry = ({ gameState, setGameState, setResponse }) => {
  const numberTileRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const [sound, setSound] = useState();
  const styles = useStyles();
  const displayStyles = displayStyle();
  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(clickSound);
        setSound(sound);
      } catch (err) {
        console.log("error loading sound", err);
      }
    };

    loadSound(); // Load sound when component mounts

    return () => {
      // Cleanup: unload the sound when the component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  const playSound = async () => {
    try {
      await sound.stopAsync(); // Stop the sound
      await sound.playAsync();
    } catch (err) {
      console.log("error playing sound", err);
    }
  };

  const [pointer, setPointer] = useState(0);
  const [displayedNumber, setDisplayedNumber] = useState(["", "", ""]);
  const isDisabled = gameState !== 3;
  const convertArrayToNumber = (arr) => {
    const filteredArray = arr.filter((item) => item !== "");
    const result =
      filteredArray.length > 0
        ? parseInt(filteredArray.join(""), 10)
        : -99999999;
    return result;
  };
  const handlePress = (e) => {
    playSound();
    if (gameState === 3) {
      if (!isNaN(e)) {
        const num = parseInt(e, 10);
        setDisplayedNumber((prev) => {
          const newValue = [...prev];
          newValue[pointer] = num;
          return newValue;
        });

        numberTileRefs.current[pointer].current?.updateNumber(num.toString());

        setPointer((val) => (val + 1) % 3);
      } else {
        switch (e) {
          case "<":
            clearDisplay();
            break;
          case "OK":
            submitResponse();
            break;
        }
      }
    }
  };

  const submitResponse = () => {
    setResponse(convertArrayToNumber(displayedNumber));
    clearDisplay();
    setGameState(4);
  };
  const clearDisplay = () => {
    setDisplayedNumber(["", "", ""]);
    setPointer(0);
    // Clear the displayed numbers in NumberTile components
    numberTileRefs.current.forEach((ref) => {
      ref.current?.updateNumber("");
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.rowContainer}>
        <View style={styles.numberDisplay}>
          <View style={{ width: "50%", flexDirection: "row" }}>
            {numberTileRefs.current.map((ref, index) => (
              <NumberTile
                key={index}
                ref={ref}
                customStyles={displayStyles}
                numberText={displayedNumber[index].toString()}
                onHoverEffect={false}
                hideText={false}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <NumberTile
          customStyles={styles}
          numberText={"1"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
        <NumberTile
          customStyles={styles}
          numberText={"2"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
        <NumberTile
          customStyles={styles}
          numberText={"3"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
      </View>
      <View style={styles.rowContainer}>
        <NumberTile
          customStyles={styles}
          numberText={"4"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
        <NumberTile
          customStyles={styles}
          numberText={"5"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
        <NumberTile
          customStyles={styles}
          numberText={"6"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
      </View>
      <View style={styles.rowContainer}>
        <NumberTile
          customStyles={styles}
          numberText={"7"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
        <NumberTile
          customStyles={styles}
          numberText={"8"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
        <NumberTile
          customStyles={styles}
          numberText={"9"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
      </View>
      <View style={styles.rowContainer}>
        <NumberTile
          customStyles={{
            ...styles,
            containerHovered: { backgroundColor: "#D15C43" },
          }}
          numberText={"<"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
        <NumberTile
          customStyles={styles}
          numberText={"0"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
        <NumberTile
          customStyles={{
            ...styles,
            text: { fontSize: 40, padding: 1 },
            containerHovered: { backgroundColor: "#DAF7A6" },
          }}
          numberText={"OK"}
          hideText={false}
          handlePress={handlePress}
          isDisabled={isDisabled}
        />
      </View>
    </View>
  );
};
