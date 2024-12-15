import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Orders = () => {
  const nav = useNavigation();
  return (
    <View>
      <Text>This is orders, we display your placed orders here</Text>
      <TouchableOpacity onPress={() => nav.goBack()}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};
