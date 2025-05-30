import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import MainTabs from './src/components/MainTabs';
import Draw from './src/screens/Draw';
import DrawResult from './src/screens/DrawResult';
import Groups from './src/screens/Groups';
import GroupDetails from './src/screens/GroupDetails';

import { AuthProvider } from './src/contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

type StackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Draw: undefined;
  DrawResult: undefined;
  Groups: undefined;
  GroupDetails: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    FasterOne: require('./assets/fonts/FasterOne.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Draw" component={Draw} />        
          <Stack.Screen name="DrawResult" component={DrawResult} />        
          <Stack.Screen name="Groups" component={Groups} />
          <Stack.Screen name="GroupDetails" component={GroupDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}