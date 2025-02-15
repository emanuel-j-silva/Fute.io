import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Dashboard from '../../screens/Dashboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type TabParamList = {
  Dashboard: undefined;
  Grupos: undefined;
  Jogadores: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator 
      initialRouteName="Dashboard" 
      shifting={true} 
      barStyle={{ backgroundColor: '#6200ea' }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="view-dashboard" color={color} size={24} />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
