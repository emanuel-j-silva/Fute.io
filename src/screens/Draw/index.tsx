import React, {useState, useCallback, useEffect, useContext} from "react";
import {View, ImageBackground, BackHandler, Alert, ActivityIndicator} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import ListPlayerCard from "../../components/ListPlayerCard";
import GroupItem from "./components/GroupItem";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";

import { RootStackParamList } from "../../../types/navigation";
import { PlayerInfo } from "../../../types/players";
import { getPlayersByGroup, performDraw } from "../../services/api/endpoints/groups";
import { AuthContext } from "../../contexts/AuthContext";

import styles from "./styles";
import { DrawInfo, DrawRequest } from "../../../types/draw";
import { RegisterResponse } from "../../../types/register";

type DrawNavigationProp = StackNavigationProp<RootStackParamList, "Draw">;


function Draw() {
  const navigation = useNavigation<DrawNavigationProp>();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [numTeams, setNumTeams] = useState<string>("");
  const [isDrawing, setIsDrawing] = useState(false);

  const {token, isLoadingAuth} = useContext(AuthContext);

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

  const fetchPlayersForGroup = useCallback(async () => {
        if (!selectedGroupId) {
            setPlayers([]);
            setLoadingPlayers(false);
            return;
        }

        if (!token || isLoadingAuth) {
            console.warn("DRAW SCREEN: Token não disponível ou autenticação em andamento. Não carregando jogadores.");
            setLoadingPlayers(false);
            return;
        }

        setLoadingPlayers(true);
        setSelectedPlayers([]);
        try {
            const data = await getPlayersByGroup(selectedGroupId);
            setPlayers(data);
        } catch (error) {
            console.error("DRAW SCREEN: Erro ao carregar jogadores do grupo:", error);
            Alert.alert("Erro", "Erro ao carregar a lista de jogadores para o grupo selecionado.");
            setPlayers([]);
        } finally {
            setLoadingPlayers(false);
        }
    }, [selectedGroupId, token, isLoadingAuth]);

    useEffect(() => {
        fetchPlayersForGroup();
    }, [fetchPlayersForGroup]);

  const togglePlayer = (playerId: number) => {
    setSelectedPlayers(prev =>
      prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId]
    );
  };

  const canDraw =
    selectedGroupId !== null &&
    selectedPlayers.length > 2 &&
    Number(numTeams) > 1 &&
    selectedPlayers.length >= Number(numTeams);
    
  const handleDraw = async () => {
        if (!canDraw || isDrawing) {
            return;
        }

        if (!selectedGroupId) {
            Alert.alert("Atenção", "Por favor, selecione um grupo antes de sortear.");
            return;
        }

        setIsDrawing(true);

        try {
          const drawRequest: DrawRequest = {
            playerIds: selectedPlayers,
            numberOfTeams: Number(numTeams)
          };
            
          const result: DrawInfo | RegisterResponse = await performDraw(drawRequest, selectedGroupId);

        if ("isError" in result) {
            Alert.alert("Erro no Sorteio", result.message);
          } else {
            navigation.navigate("DrawResult", { teams: result.teams });
          }
        } catch (error) {
          console.error("DRAW SCREEN: Erro inesperado ao realizar sorteio:", error);
          Alert.alert("Erro", "Ocorreu um erro inesperado ao tentar sortear os times.");
        } finally {
          setIsDrawing(false);
        }
  };


    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/draw-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>            
            <GroupItem onGroupSelect={setSelectedGroupId} selectedGroupId={selectedGroupId}/>
            <ListPlayerCard title="Jogadores" players={players}
            pressable={true} selectedIds={selectedPlayers}
            onLongPress={togglePlayer}/>
            <View>
                <Input placeholder="Número de times" type="numeric" 
                  value={numTeams} onChangeText={setNumTeams}/>
            </View>
            <CustomButton title={isDrawing ? "Sorteando..." : "Sortear"} onPress={handleDraw}
                backgroundColor="#D9D9D9"  disabled={!canDraw}
                textColor={canDraw ? "#050517" : "#FFF"}
                pressedBackgroundColor="#FFFFFF"/>
        </View>
    </ImageBackground>
    );
}

export default Draw;