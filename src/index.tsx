import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Navigation} from './navigation';

export const App = () => {
  return (
    <GestureHandlerRootView>
      <Navigation />
    </GestureHandlerRootView>
  );
};
