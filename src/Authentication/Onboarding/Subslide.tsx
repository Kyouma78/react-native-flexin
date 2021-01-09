import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

import {Button, Text} from "../../components"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 44,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 12
  },
  description: {
    color: "#0C0D34",
    textAlign: "center",
    marginBottom: 40
  },
});

interface SubslideProps {
  subtitle: string;
  description: string;
  last?: boolean;
  x: Animated.SharedValue<number>;
  onPress: () => void;
}

const Subslide = ({subtitle, description, last, onPress}: SubslideProps) => {
  return (
    <View style={styles.container}>
      <Text variant="title2" style={styles.subtitle}>{subtitle}</Text>
      <Text variant="body" style={styles.description}>{description}</Text>
      <Button
        label={last ? "Let's get started" : "Next"}
        variant={last ? "primary" : "default"}
        style={{ width: 245, height: 50}}
        {...{ onPress }}
      />
    </View>
  );
};

export default Subslide;