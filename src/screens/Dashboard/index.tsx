import React, {useState, useContext, useEffect} from "react";
import {View, Text, ImageBackground, Alert, ActivityIndicator} from "react-native"
import { StackNavigationProp } from '@react-navigation/stack';
import InfoCard from "./components/InfoCard";
import DashboardHeader from "./components/DashboardHeader";
import ListPlayerCard from "../../components/ListPlayerCard";
import styles from "./styles";
import FabButton from "../../components/FabButton";

import { getTopPlayers } from "../../services/api/endpoints/players";
import { PlayerInfo } from "../../../types/players";
import { AuthContext } from "../../contexts/AuthContext";

type StackDashList = {
    Dashboard: undefined;
    Draw: undefined;
  };
  
  type DashProps = {
    navigation: StackNavigationProp<StackDashList, "Dashboard">;
  };

function Dashboard({navigation}: DashProps) {
    const [players, setPlayers] = useState<PlayerInfo[]>([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    

    const { token, isLoadingAuth } = useContext(AuthContext); 
    
    useEffect(() => {
            async function loadPlayers() {
                if (token && !isLoadingAuth) {
                    try {
                        setLoadingPlayers(true);
                        const data = await getTopPlayers();
                        setPlayers(data);
                    } catch (error) {
                        Alert.alert("Erro", "Erro ao carregar grupos.");
                    } finally {
                        setLoadingPlayers(false);
                    }
                } else if (!token && !isLoadingAuth) {
                    console.warn("DASHBOARD SCREEN: Nenhum token disponível para carregar jogadores.");
                }
            }
            loadPlayers();
        }, [token, isLoadingAuth]);

        if (isLoadingAuth || loadingPlayers) {
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size="large" color="#0077B6" />
                <Text style= {{ marginTop: 10, color: '#fff' }}>Carregando...</Text>
            </View>
        );
    }
    
    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/home-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <DashboardHeader name="Emanuel Silva"/>
            <View style={styles.content}>
                <View style={styles.cardsRow}>
                    <InfoCard 
                    title="Último" 
                    subtitle="Sorteio" 
                    content={{text: "15/02/25", size: 22}}
                    footer="Grupo Star"
                    />
                    <InfoCard 
                    title="Total de" 
                    subtitle="Sorteios" 
                    content={{text: "15", size: 50}}
                    />
                </View>
                <ListPlayerCard title="Top Jogadores" players={players}/>
            </View>
            <FabButton icon="shuffle" onPress={()=> navigation.replace("Draw")}/>
        </View>
    </ImageBackground>
    );
}

export default Dashboard;