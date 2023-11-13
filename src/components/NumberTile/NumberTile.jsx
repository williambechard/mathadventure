// NumberTile.js
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { responsiveSize } from "../helper-functions";
const useStyles = () => {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    containerHovered: {
      backgroundColor: "lightblue", // Change background color on hover
    },
    container: {
      width: "4vw",
      height: "4vw",
      backgroundColor: "#C0C0C0",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "1vw",
      borderRadius: responsiveSize(10, width, height),
    },
    containerSelected: {
      backgroundColor: "#FBF38A",
    },
    containerCorrect: {
      backgroundColor: "#BEE5B0",
    },
    containerIncorrect: {
      backgroundColor: "#FF9997",
    },
    text: {
      fontSize: "2vw",
      padding: "1vw",
    },
    disabled: {
      opacity: 0.25,
    },
  });
};

const NumberTile = forwardRef(
  (
    {
      numberText,
      customStyles = null,
      hideText = true,
      onHoverEffect = true,
      handlePress = () => {},
      state = 0,
      isDisabled = false,
    },
    ref,
  ) => {
    const [isHovered, setHovered] = useState(false);
    const [tileNumber, setTileNumber] = useState(numberText);
    const styles = useStyles();

    useEffect(() => {
      switch (state) {
        case 1:
          console.log(numberText + " is state " + state);
          break;
        case 2:
          console.log(numberText + " is state " + state);
          break;
        case 3:
          console.log(numberText + " is state " + state);
          break;
      }
    }, [state]);

    const handleMouseEnter = () => {
      if (onHoverEffect) setHovered(true);
    };

    const handleMouseLeave = () => {
      if (onHoverEffect) setHovered(false);
    };

    // Expose the state through the ref

    useImperativeHandle(ref, () => ({
      updateNumber: (newNumber) => {
        setTileNumber(newNumber);
      },
    }));

    return (
      <Pressable
        onPress={() => handlePress(numberText)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={[customStyles?.pressable, { flex: 1 }]}
      >
        <View
          style={[
            customStyles?.container || styles.container,
            isHovered &&
              (customStyles?.containerHovered || styles.containerHovered),
            state === 1 && styles.containerSelected,
            state === 2 && styles.containerCorrect,
            state === 3 && styles.containerIncorrect,
            isDisabled && styles.disabled,
          ]}
        >
          <Text style={customStyles?.text || styles.text}>
            {hideText ? "" : tileNumber}
          </Text>
        </View>
      </Pressable>
    );
  },
);

export default NumberTile;
