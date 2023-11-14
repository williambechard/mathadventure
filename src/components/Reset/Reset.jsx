import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { Button, Icon, IconButton } from "react-native-paper";

const useStyles = () => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      borderRadius: 15,
      fontSize: "18vw",
      backgroundColor: "rgb(0, 150, 136)",
      color: "white",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
export const Reset = ({ setGameState }) => {
  const styles = useStyles();

  const handlePress = () => {
    setGameState(0);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Icon size={40} source="refresh" />
    </Pressable>
  );
};
