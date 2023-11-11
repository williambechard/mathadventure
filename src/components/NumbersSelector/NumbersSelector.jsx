import { Text, StyleSheet, Switch, View } from "react-native";
import { useEffect, useState } from "react";
import NumberToggle from "../NumberToggle/NumberToggle";

const styles = StyleSheet.create({
  container: {
    width: "99%",
    height: 140,
    backgroundColor: "#E8E8E8",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
  },
});
const NumbersSelector = ({ setNumbers, gameState }) => {
  const [toggledNumbers, setToggledNumbers] = useState([]);
  const [allToggled, setAllToggled] = useState(false);

  useEffect(() => {
    setNumbers(toggledNumbers);
  }, [toggledNumbers, setNumbers]);

  const generateNumbers = () =>
    [...Array(13)].map((_, i) => (
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
      />
    ));

  const toggleAll = () => {
    setAllToggled((prev) => !prev);
    setToggledNumbers(
      allToggled ? [] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    );
  };

  return (
    <View style={styles.container}>
      {generateNumbers()}
      <NumberToggle
        gameState={gameState}
        numberText={"All"}
        key={"All"}
        isAllToggled={allToggled}
        setNumberToggle={toggleAll}
      />
    </View>
  );
};

export default NumbersSelector;
