import React from "react";
import {View, ImageBackground, BackHandler, Alert} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import ListPlayerCard from "../../components/ListPlayerCard";
import GroupItem from "./components/GroupItem";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import styles from "./styles";

import { RootStackParamList } from "../../../types/navigation";

type DrawNavigationProp = StackNavigationProp<RootStackParamList, "Draw">;


function Draw() {
    const navigation = useNavigation<DrawNavigationProp>();

    useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
      Alert.alert('Sair', 'Você deseja voltar para o Dashboard?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            navigation.navigate('MainTabs');
          },
        },
      ]);
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [])
);

    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/draw-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>            
            <GroupItem />
            <ListPlayerCard title="Jogadores"/>
            <View>
                <Input placeholder="Número de times" type="numeric"/>
            </View>
            <CustomButton title="Sortear" onPress={()=>{}}
                backgroundColor="#D9D9D9" textColor="#050517"
                pressedBackgroundColor="#FFFFFF"/>
        </View>
    </ImageBackground>
    );
}

export default Draw;