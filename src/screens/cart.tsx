import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Cart = () => {
  const nav = useNavigation();

  return (
    <View>
      <Text>This is cart, do you see your items here?</Text>
      {/* @ts-ignore, there is route name issue */}
      <TouchableOpacity onPress={() => nav.navigate('orders')}>
        <Text>Go to orders</Text>
      </TouchableOpacity>
    </View>
  );
};
