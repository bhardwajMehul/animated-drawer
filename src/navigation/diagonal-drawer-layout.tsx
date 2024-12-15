import React, {ReactNode} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

import {Header} from '../common';

const {width, height} = Dimensions.get('window');
const DefaultMarginTop = 60;
const DefaultBorderRadius = 30;
const DarkBackgroundColor = 'rgb(25,23,39)';
const textColor = 'rgb(217,104,100)';
const buttonBgColor = 'rgb(55,38,50)';

const buttons = ['Start', 'Your Cart', 'Favorites', 'Your Orders'];

export const DiagonalDrawerLayout = ({children}: {children: ReactNode}) => {
  const drawerProgress = useSharedValue(0);
  // it's a workaround to find the current screen we are on, FIXME: find a better way to find the same

  const animatedBorder = useAnimatedStyle(() => {
    return {
      borderTopLeftRadius: withTiming(
        drawerProgress.value === 1 ? DefaultBorderRadius : 0,
      ),
    };
  });

  const animatedDrawerStyle = useAnimatedStyle(() => {
    const marginTop = withTiming(
      drawerProgress.value === 1 ? DefaultMarginTop : 0,
    );
    return {marginTop};
  });

  const animatedMainStyle = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.9]);
    const rotate = interpolate(drawerProgress.value, [0, 1], [0, -5]);
    const translateX = interpolate(
      drawerProgress.value,
      [0, 1],
      [0, width * 0.55],
    );
    const marginTop = withTiming(
      drawerProgress.value === 1 ? DefaultMarginTop - 20 : 0,
    );

    return {
      transform: [
        {scale: withTiming(scale)},
        {translateX: withTiming(translateX)},
        {rotate: withTiming(`${rotate}deg`)},
      ],
      marginTop,
    };
  });

  const toggleDrawer = () => {
    drawerProgress.value = withTiming(drawerProgress.value === 0 ? 1 : 0);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.drawer, animatedDrawerStyle, animatedBorder]}>
        <Text style={styles.brandTitle}>Beka</Text>
        {buttons.map((name, ix) => {
          return (
            <TouchableOpacity
              key={`drawer-navigation-option${name}`}
              style={[
                styles.navigationButton,
                ix === 0 && styles.selectedNavigationButton,
              ]}>
              <Text
                style={[
                  styles.navigationButtonText,
                  ix === 0 && styles.selectedNavigationButtonText,
                ]}
                onPress={toggleDrawer}>
                {/* @ts-ignore these are the routes name, can be configured better when we have proper screens */}
                {name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <PanGestureHandler>
        <Animated.View
          style={[styles.mainScreen, animatedMainStyle, animatedBorder]}>
          <Header onPress={toggleDrawer} sv={drawerProgress} />
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: DarkBackgroundColor,
    height,
    width,
    zIndex: 0,
    paddingTop: '25%',
    paddingLeft: 20,
  },
  mainScreen: {
    flex: 1,
    backgroundColor: 'white',
    zIndex: 1,
  },
  brandTitle: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 30,
    fontSize: 24,
    marginBottom: 30,
  },
  navigationButton: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 140,
    backgroundColor: 'transparent',
  },
  selectedNavigationButton: {
    backgroundColor: buttonBgColor,
  },
  navigationButtonText: {fontSize: 18, color: 'white'},
  selectedNavigationButtonText: {
    color: textColor,
  },
});
