import {View} from 'react-native';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as Screen from '../screens';
import {DiagonalDrawerLayout} from './diagonal-drawer-layout';

export enum ScreenIds {
  'start' = 'Start',
  'cart' = 'Cart',
  'favourites' = 'Favourites',
  'orders' = 'Your Orders',
}
const PaddedLayout = ({children}: {children: React.JSX.Element}) => (
  <View style={{flex: 1, padding: 30}}>{children}</View>
);

const HomeStack = createNativeStackNavigator({
  screens: {
    cart: Screen.Cart,
    orders: Screen.Orders,
  },
  initialRouteName: 'cart',
  screenOptions: {headerShown: false},
});

const Tab = createBottomTabNavigator({
  screens: {
    home: HomeStack,
    contact: Screen.Contact,
  },
  initialRouteName: 'home',
  screenLayout: PaddedLayout,
  screenOptions: {
    headerShown: false,
  },
});

const Stack = createNativeStackNavigator({
  screens: {
    tab: Tab,
  },
  layout: DiagonalDrawerLayout,
  initialRouteName: 'tab',
  screenOptions: {
    headerShown: false,
    contentStyle: {backgroundColor: 'transparent'},
  },
});

export const Navigation = createStaticNavigation(Stack);
