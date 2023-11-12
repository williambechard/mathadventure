import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import NumberTile from "../NumberTile/NumberTile";
import { Banner } from "../Banner/Banner";
import { Audio } from "expo-av";
import clickSound from "../../../assets/sound/click3.mp3";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#C0C0C0",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
    gap: 4,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  mainText: {
    fontSize: 40,
    padding: 1,
  },
  container: {
    width: 110,
    height: 140,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: 30,
    borderRadius: 15,
  },
  text: {
    fontSize: 100,
    padding: 1,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    height: "17.5%",
    justifyContent: "center",
  },
  numberDisplay: {
    backgroundColor: "#AFAFAF",
    width: "90%",
    marginTop: 10,
    height: "70%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.25,
    width: 110,
    height: 140,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: 30,
    borderRadius: 15,
  },
});

const displayStyle = StyleSheet.create({
  container: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "rgb(0,150,136)",
    fontSize: 100,
  },
});

export const NumberEntry = ({ gameState, setGameState, setResponse }) => {
  const numberTileRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const [sound, setSound] = useState();

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
      filteredArray.length > 0 ? parseInt(filteredArray.join(""), 10) : 0;
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
            setResponse(convertArrayToNumber(displayedNumber));
            clearDisplay();
            setGameState(4);
            break;
        }
      }
    }
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
          {numberTileRefs.current.map((ref, index) => (
            <NumberTile
              key={index}
              ref={ref}
              customStyles={displayStyle}
              numberText={displayedNumber[index].toString()}
              onHoverEffect={false}
              hideText={false}
            />
          ))}
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
            text: { fontSize: 80, padding: 1 },
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
