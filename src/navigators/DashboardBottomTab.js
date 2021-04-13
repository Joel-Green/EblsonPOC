import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../components/Dashboard';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GOLD, LIGHT_GRAY } from '../globals/colors';

export default function DashboardBottomTab() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        /////////////////this is to configure the tab name of each tab according to the current focused tab

        tabBarLabel: ({ focused, name }) => {
          let tabFocused;
          if (route.name === 'Home') {
            tabFocused = focused ? 'Home' : '';
          } else if (route.name === 'Trophies') {
            tabFocused = focused ? 'Trophies' : '';
          } else if (route.name === 'Inbox') {
            tabFocused = focused ? 'Inbox' : '';
          } else if (route.name === 'More') {
            tabFocused = focused ? 'More' : '';
          }
          return (
            <Text style={{ color: GOLD, fontSize: 12, paddingBottom: 5 }}>
              {tabFocused}
            </Text>
          );
        },
        /////////////////this is to configure the appearence (icon , icon color, size) of each tab according to the current focused tab

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // You can return any component that you like here!

          if (route.name === 'Home') {
            color = focused ? GOLD : LIGHT_GRAY;
            size = focused ? 18 : 16;
            return <MIcon name="home" size={size} color={color} />;
          } else if (route.name === 'Trophies') {
            color = focused ? GOLD : LIGHT_GRAY;
            size = focused ? 18 : 16;
            return <MCIcon name="trophy" size={size} color={color} />;
          } else if (route.name === 'Inbox') {
            color = focused ? GOLD : LIGHT_GRAY;
            size = focused ? 18 : 16;
            return <MIcon name="inbox" size={size} color={color} />;
          } else if (route.name === 'More') {
            color = focused ? GOLD : LIGHT_GRAY;
            size = focused ? 18 : 16;
            return <MIcon name="more-horiz" size={size} color={color} />;
          }
        },
      })}
      //////////////////this is basic tab bar styling
      tabBarOptions={{
        tabStyle: { paddingTop: 3 },
        inactiveBackgroundColor: '#ffffff',
        activeBackgroundColor: '#ffffff',
      }}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Trophies" component={Dashboard} />
      <Tab.Screen name="Inbox" component={Dashboard} />
      <Tab.Screen name="More" component={Dashboard} />
    </Tab.Navigator>
  );
}
