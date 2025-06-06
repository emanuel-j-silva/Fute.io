import React, {useState, useCallback} from "react";
import {View, ImageBackground, BackHandler, Alert} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import ListPlayerCard from "../../components/ListPlayerCard";
import GroupItem from "./components/GroupItem";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import styles from "./styles";

import { RootStackParamList } from "../../../types/navigation";
import { mockPlayers } from "../../data/mockPlayers";

type DrawNavigationProp = StackNavigationProp<RootStackParamList, "Draw">;


function Draw() {
  const navigation = useNavigation<DrawNavigationProp>();
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [numTeams, setNumTeams] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Sair", "Você deseja voltar para o Dashboard?", [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sim",
            onPress: () => navigation.navigate("MainTabs"),
          },
        ]);
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const togglePlayer = (playerId: number) => {
    setSelectedPlayers(prev =>
      prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId]
    );
  };

  const canDraw =
    selectedPlayers.length > 0 && Number(numTeams) > 0 && selectedPlayers.length > Number(numTeams);

  const handleDraw = () => {
    navigation.navigate("DrawResult");
  };


    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/draw-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>            
            <GroupItem />
            <ListPlayerCard title="Jogadores" players={mockPlayers}
            pressable={true} selectedIds={selectedPlayers}
            onLongPress={togglePlayer}/>
            <View>
                <Input placeholder="Número de times" type="numeric" 
                  value={numTeams} onChangeText={setNumTeams}/>
            </View>
            <CustomButton title="Sortear" onPress={handleDraw}
                backgroundColor="#D9D9D9"  disabled={!canDraw}
                textColor={canDraw ? "#050517" : "#FFF"}
                pressedBackgroundColor="#FFFFFF"/>
        </View>
    </ImageBackground>
    );
}

export default Draw;