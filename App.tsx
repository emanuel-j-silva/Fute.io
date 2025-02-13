import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type StackParamList = {
  Login: undefined;
  MainTabs: undefined;
};

type TabParamList = {
  Dashboard: undefined;
  Grupos: undefined;
  Jogadores: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabParamList>();

function MainTabs(){
  return(
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
  )
}

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    FasterOne: require('./assets/fonts/FasterOne.ttf'),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}