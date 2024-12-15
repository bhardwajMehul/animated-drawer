import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
// @ts-ignore this needs to configured
import More from '../assets/svg/more.svg';
import Animated, {
  useAnimatedStyle,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

export const Header = ({
  onPress,
  sv,
}: {
  onPress: () => void;
  sv: SharedValue<number>;
}) => {
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {marginTop: withTiming(sv.value === 1 ? 40 : 80)};
  });

  return (
    <AnimatedButton
      style={[styles.container, animatedContainerStyle]}
      onPress={onPress}>
      <More />
      <Text style={styles.text}>START</Text>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  text: {
    fontSize: 24,
    letterSpacing: 5,
    color: '#657780',
    paddingLeft: 20,
  },
});
