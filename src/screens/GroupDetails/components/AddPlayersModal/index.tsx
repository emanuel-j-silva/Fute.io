import React, {useState, useEffect, useContext, useCallback} from "react";
import {Text, View, Modal, Pressable, Alert, ActivityIndicator} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListPlayerCard from "../../../../components/ListPlayerCard";
import CustomButton from "../../../../components/CustomButton";

import { PlayerInfo } from "../../../../../types/players";
import { AuthContext } from "../../../../contexts/AuthContext";

import styles from "./styles";
import { getPlayersNotInGroup } from "../../../../services/api/endpoints/groups";

interface AddPlayersProps{
    visible: boolean;
    onClose: ()=> void;
    groupId: string;
}

function AddPlayersModal({visible, onClose, groupId}: AddPlayersProps) {
    const [players, setPlayers] = useState<PlayerInfo[]>([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

    const { token, isLoadingAuth } = useContext(AuthContext); 
    
    const fetchPlayers = useCallback(async () => {
                if (!token || isLoadingAuth) {
                    console.warn("GROUP DETAILS SCREEN: Token não disponível ou autenticação em andamento para carregar jogadores.");
                    setLoadingPlayers(false);
                    return;
                }
        
                setLoadingPlayers(true);
                try {
                    const data = await getPlayersNotInGroup(groupId);
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

    const togglePlayer = (name: string) => {
        setSelectedPlayers(prev =>
            prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
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
        <Modal visible={visible} animationType="fade"
                onRequestClose={onClose} transparent={true}>
            <View style={styles.container}>
                <Pressable onPress={onClose}>
                    <Icon name="close-circle" size={28} color="red" style={styles.closeIcon} />
                </Pressable>
                <Text style={styles.title}>Fute.io</Text>
                <Text style={styles.subtitle}>Selecione os jogadores que deseja incluir neste grupo</Text>
                <ListPlayerCard title="Adicionar Jogadores" players={players}
                pressable={true} 
                    onLongPress={togglePlayer} selectedNames={selectedPlayers}/>
                <View style={styles.buttonContainer}>
                    <CustomButton title="Adicionar ao Grupo" onPress={()=>{}} 
                        backgroundColor="#050517" textColor="#D9D9D9"
                        pressedBackgroundColor="#03045E" />
                </View>
            </View>
        </Modal>
    );
}

export default AddPlayersModal;