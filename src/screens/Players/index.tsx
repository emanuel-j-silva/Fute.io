import React, { useState, useContext, useEffect } from "react";
import {Text, View, ImageBackground, Alert, ActivityIndicator} from "react-native"
import CustomButton from "../../components/CustomButton";
import ListPlayerCard from "../../components/ListPlayerCard";
import NewPlayerModal from "./components/NewPlayerModal";

import { getAllPlayers } from "../../services/api/endpoints/players";
import { PlayerInfo } from "../../../types/players";
import { AuthContext } from "../../contexts/AuthContext";

import styles from "./styles";

function Players() {
    const [players, setPlayers] = useState<PlayerInfo[]>([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

    const { token, isLoadingAuth } = useContext(AuthContext); 
    

    const handlePlayerLongPress = (name: string) => {
        setSelectedPlayer(prev => (prev === name ? null : name));
    };
    
    const handleRemove = () => {
        if (!selectedPlayer) return;
        // API remove player logic
        // após remover, limpar seleção
        setSelectedPlayer(null);
    };

    useEffect(() => {
            async function loadPlayers() {
                if (token && !isLoadingAuth) {
                    try {
                        setLoadingPlayers(true);
                        const data = await getAllPlayers();
                        setPlayers(data);
                    } catch (error) {
                        Alert.alert("Erro", "Erro ao carregar grupos.");
                    } finally {
                        setLoadingPlayers(false);
                    }
                } else if (!token && !isLoadingAuth) {
                    console.warn("PLAYERS SCREEN: Nenhum token disponível para carregar jogadores.");
                }
            }
            loadPlayers();
        }, [token, isLoadingAuth]);
    if (isLoadingAuth || loadingPlayers) {
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size="large" color="#0077B6" />
                <Text style={{ marginTop: 10, color: '#fff' }}>Carregando...</Text>
            </View>
        );
    }

    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/players-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <Text style={styles.title}>Jogadores</Text>
            <View style={styles.buttonsRow}>
                <View style={{flex: 1}}>
                    <CustomButton title="Novo Jogador" onPress={()=> setModalVisible(true)} 
                    fontSize={12} backgroundColor="#03045E" pressedBackgroundColor="#0077B6"
                        paddingHorizontal={30} paddingVertical={30} />
                </View>
                <View style={{flex: 1}}>
                    <CustomButton title="Excluir Jogador" onPress={handleRemove} fontSize={12}
                        backgroundColor="#03045E" pressedBackgroundColor="#0077B6"
                        paddingHorizontal={30} paddingVertical={30} disabled={!selectedPlayer}/>
                </View>
            </View>
            <ListPlayerCard title="Todos os Jogadores" players={players} pressable={true} selectedName={selectedPlayer}
                onLongPress={handlePlayerLongPress}/>
            <NewPlayerModal visible={modalVisible} onClose={()=> setModalVisible(false)}/>
        </View>
    </ImageBackground>
    );
}

export default Players;