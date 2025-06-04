import React, {useState, useContext, useEffect} from "react";
import {View, Text, ImageBackground, Alert, ActivityIndicator} from "react-native"
import { StackNavigationProp } from '@react-navigation/stack';
import InfoCard from "./components/InfoCard";
import DashboardHeader from "./components/DashboardHeader";
import ListPlayerCard from "../../components/ListPlayerCard";
import styles from "./styles";
import FabButton from "../../components/FabButton";

import { AuthContext } from "../../contexts/AuthContext";

import { getTopPlayers } from "../../services/api/endpoints/players";
import { PlayerInfo } from "../../../types/players";

import { getSummaryInfo } from "../../services/api/endpoints/summary";
import { SummaryInfo } from "../../../types/summary";

type StackDashList = {
    Dashboard: undefined;
    Draw: undefined;
  };
  
  type DashProps = {
    navigation: StackNavigationProp<StackDashList, "Dashboard">;
  };

function Dashboard({navigation}: DashProps) {
    const [players, setPlayers] = useState<PlayerInfo[]>([]);
    const [summaryInfo, setSummaryInfo] = useState<SummaryInfo | undefined>(undefined);

    const [loadingData, setLoadingData] = useState(true);

    const { token, isLoadingAuth } = useContext(AuthContext); 
    
    useEffect(() => {
            async function loadDashboardData() {
                if (token && !isLoadingAuth) {
                    try {
                        setLoadingData(true);

                        const playersData = await getTopPlayers();
                        setPlayers(playersData);

                        const summaryData = await getSummaryInfo();
                        setSummaryInfo(summaryData);
                    } catch (error) {
                        Alert.alert("Erro", "Erro ao carregar informações do Dashboard.");
                    } finally {
                        setLoadingData(false);
                    }
                } else if (!token && !isLoadingAuth) {
                    console.warn("DASHBOARD SCREEN: Nenhum token disponível para carregar jogadores.");
                }
            }
            loadDashboardData();
        }, [token, isLoadingAuth]);

        if (isLoadingAuth || loadingData) {
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size="large" color="#0077B6" />
                <Text style= {{ marginTop: 10, color: '#fff' }}>Carregando...</Text>
            </View>
        );
    }

    if (!summaryInfo) {
        return (
            <View style={styles.loadingView}>
                <Text style={{ marginTop: 10, color: '#fff' }}>
                    Erro: Dados do sumário não disponíveis.
                </Text>
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
                    content={{text: summaryInfo.lastDrawDate, size: 22}}
                    footer={summaryInfo?.lastDrawGroup}
                    />
                    <InfoCard 
                    title="Total de" 
                    subtitle="Sorteios" 
                    content={{text: summaryInfo.totalDraws.toString(), size: 50}}
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