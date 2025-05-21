import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Dashboard from '../../screens/Dashboard';
import Players from '../../screens/Players';
import Groups from '../../screens/Groups';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

type TabParamList = {
  Dashboard: undefined;
  Groups: undefined;
  Players: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabParamList>();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: 'transparent',
  },
};

function MainTabs() {
  return (
    <PaperProvider theme={customTheme}>
      <Tab.Navigator 
      initialRouteName="Dashboard" 
      shifting={true}
      labeled={false}
      activeColor="#FFFFFF"
      inactiveColor="#FFFFFF"
      barStyle={styles.barStyle}
    >
      <Tab.Screen 
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
          tabBarColor: "#FF5733"
        }} 
      />

      <Tab.Screen 
        name="Players"
        component={Players}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={30} />
          ),
          tabBarColor: "#FF5733"
        }} 
      />

      <Tab.Screen 
        name="Groups"
        component={Groups}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account-group" color={color} size={30} />
          ),
          tabBarColor: "#FF5733"
        }} 
      />

    </Tab.Navigator>
    </PaperProvider>
  );
}

export default MainTabs;
