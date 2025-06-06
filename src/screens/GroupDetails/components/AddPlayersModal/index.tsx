import React, {useState, useEffect, useContext, useCallback} from "react";
import {Text, View, Modal, Pressable, Alert, ActivityIndicator} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListPlayerCard from "../../../../components/ListPlayerCard";
import CustomButton from "../../../../components/CustomButton";

import { PlayerInfo } from "../../../../../types/players";
import { AuthContext } from "../../../../contexts/AuthContext";

import styles from "./styles";
import { associatePlayersToGroup, getPlayersNotInGroup } from "../../../../services/api/endpoints/groups";
import { AssociatePlayersRequest } from "../../../../../types/group";

interface AddPlayersProps{
    visible: boolean;
    onClose: ()=> void;
    groupId: string;
    onPlayersRegistered: ()=> void;

}

function AddPlayersModal({visible, onClose, groupId, onPlayersRegistered}: AddPlayersProps) {
    const [playersAvailable, setPlayersAvailable] = useState<PlayerInfo[]>([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { token, isLoadingAuth } = useContext(AuthContext); 
    
    const fetchPlayers = useCallback(async () => {
        if(!visible) return;

        if (!token || isLoadingAuth) {
            console.warn("GROUP DETAILS SCREEN: Token não disponível ou autenticação em andamento para carregar jogadores.");
            setLoadingPlayers(false);
            return;
        }

        setLoadingPlayers(true);
        setSelectedPlayerIds([]);
        try {
            const data = await getPlayersNotInGroup(groupId);
            setPlayersAvailable(data);
        } catch (error) {
            console.error("PLAYERS SCREEN: Erro ao carregar jogadores:", error);
            Alert.alert("Erro", "Erro ao carregar a lista de jogadores.");
        } finally {
            setLoadingPlayers(false);
        }
    }, [token, isLoadingAuth, groupId, visible]);
        
    useEffect(() => {
        if(visible){
            fetchPlayers();
        }
    }, [visible, fetchPlayers]);

    const togglePlayer = (playerId: number) => {
        setSelectedPlayerIds(prev =>
            prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId]
        );
    };

    const HandleAssociatePlayers = async () => {
        if (selectedPlayerIds.length === 0) {
            Alert.alert("Atenção", "Selecione pelo menos um jogador para adicionar ao grupo.");
            return;
        }

        setIsSubmitting(true);

        try {
            const requestBody: AssociatePlayersRequest = {
                playerIds: selectedPlayerIds
            };
            const response = await associatePlayersToGroup(requestBody, groupId);

            Alert.alert(
                response.isError ? "Erro ao Adicionar" : "Sucesso",
                response.message,
                [{ text: "OK", onPress: () => {
                    if (!response.isError) {
                        onClose();
                        onPlayersRegistered();
                        setSelectedPlayerIds([]);
                    }
                }}]
            );
        } catch (error) {
            console.error("ADD PLAYERS MODAL: Erro ao associar jogadores:", error);
            Alert.alert("Erro", "Ocorreu um erro ao adicionar os jogadores ao grupo.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <Modal visible={visible} animationType="fade"
                onRequestClose={onClose} transparent={true}>
            {isLoadingAuth || loadingPlayers ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0077B6" />
                    <Text style={styles.loadingText}>
                        Carregando jogadores disponíveis...
                    </Text>
                </View>): 
                (<View style={styles.container}>
                <Pressable onPress={onClose}>
                    <Icon name="close-circle" size={28} color="red" style={styles.closeIcon} />
                </Pressable>
                <Text style={styles.title}>Fute.io</Text>
                <Text style={styles.subtitle}>Selecione os jogadores que deseja incluir neste grupo</Text>
                <ListPlayerCard title="Adicionar Jogadores" players={playersAvailable}
                pressable={true} 
                    onLongPress={(playerIdFromCard) => togglePlayer(playerIdFromCard)} selectedIds={selectedPlayerIds}/>
                <View style={styles.buttonContainer}>
                    <CustomButton title="Adicionar ao Grupo" onPress={HandleAssociatePlayers} 
                        backgroundColor="#050517" textColor="#D9D9D9"
                        pressedBackgroundColor="#03045E"
                        disabled={isSubmitting} />
                </View>
            </View>)
                }
        </Modal>
    );
}

export default AddPlayersModal;