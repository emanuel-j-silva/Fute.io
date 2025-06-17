import React, { useState, useContext, useEffect, useCallback } from "react";
import {Text, View, ImageBackground, Alert, ActivityIndicator} from "react-native"
import CustomButton from "../../components/CustomButton";
import ListPlayerCard from "../../components/ListPlayerCard";
import NewPlayerModal from "./components/NewPlayerModal";

import { getAllPlayers, deletePlayer } from "../../services/api/endpoints/players";
import { PlayerInfo } from "../../../types/players";
import { AuthContext } from "../../contexts/AuthContext";

import styles from "./styles";
import { RegisterResponse } from "../../../types/register";

function Players() {
    const [players, setPlayers] = useState<PlayerInfo[]>([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
    const [isDeletingPlayer, setIsDeletingPlayer] = useState(false);
    

    const { token, isLoadingAuth } = useContext(AuthContext); 
    
    const handlePlayerLongPress = (playerId: number) => {
        setSelectedPlayer(prev => (prev === playerId ? null : playerId));
    };
    
    const fetchPlayers = useCallback(async () => {
        if (!token || isLoadingAuth) {
            console.warn("PLAYERS SCREEN: Token não disponível ou autenticação em andamento para carregar jogadores.");
            setLoadingPlayers(false);
            return;
        }

        setLoadingPlayers(true);
        try {
            const data = await getAllPlayers();
            setPlayers(data);
        } catch (error) {
            console.error("PLAYERS SCREEN: Erro ao carregar jogadores:", error);
            Alert.alert("Erro", "Erro ao carregar a lista de jogadores.");
        } finally {
            setLoadingPlayers(false);
        }
    }, [token, isLoadingAuth]);

    useEffect(() => {
        fetchPlayers();
    }, [fetchPlayers]);

    const handleNewPlayerRegistered = () => {
        fetchPlayers();
    };

    const handleRemove = async () => {
            if (!selectedPlayer || isDeletingPlayer) {
                return;
            }
    
            Alert.alert(
                "Confirmar Deleção",
                `Tem certeza que deseja deletar o jogador selecionado?`,
                [
                    {
                        text: "Cancelar",
                        style: "cancel",
                        onPress: () => setSelectedPlayer(null)
                    },
                    {
                        text: "Deletar",
                        onPress: async () => {
                            setIsDeletingPlayer(true);
    
                            try {
                                const result: RegisterResponse = await deletePlayer(selectedPlayer);
                                
                                if (result.isError) {
                                    Alert.alert("Erro ao Remover", result.message);
                                } else {
                                    Alert.alert("Sucesso", result.message || "Jogador deletado com sucesso!");
                                    setSelectedPlayer(null);
                                    fetchPlayers();
                                }
                            } catch (error) {
                                console.error("PLAYERS SCREEN: Erro inesperado ao deletar jogador:", error);
                                Alert.alert("Erro", "Ocorreu um erro inesperado ao deletar o jogador.");
                            } finally {
                                setIsDeletingPlayer(false);
                            }
                        },
                        style: "destructive"
                    },
                ],
                { cancelable: true, onDismiss: () => setSelectedPlayer(null) }
            );
        };

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
            <ListPlayerCard title="Todos os Jogadores" players={players} pressable={true} selectedId={selectedPlayer}
                onLongPress={handlePlayerLongPress}/>
            <NewPlayerModal visible={modalVisible} onClose={()=> setModalVisible(false)}
                onPlayerRegistered={handleNewPlayerRegistered}/>
        </View>
    </ImageBackground>
    );
}

export default Players;