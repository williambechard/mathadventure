import { Animated } from "react-native";
import { useEffect, useState } from "react";

export const FadeIn = ({ duration, children }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};
