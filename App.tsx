import React from 'react';
import { useFonts } from 'expo-font';
import Login from './src/screens/Login';

export default function App() {
  const [fontsLoaded] = useFonts({
    FasterOne: require('./assets/fonts/FasterOne.ttf'),
  });

  return (
    <Login/>
  );
}