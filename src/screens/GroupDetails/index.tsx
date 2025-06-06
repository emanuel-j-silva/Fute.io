import React, {useState, useEffect, useCallback, useContext} from "react";
import {Text, View, ImageBackground, Alert, ActivityIndicator} from "react-native";
import ListPlayerCard from "../../components/ListPlayerCard";
import CustomButton from "../../components/CustomButton";
import AddPlayersModal from "./components/AddPlayersModal";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigation";

import { PlayerInfo } from "../../../types/players";
import { getPlayersByGroup } from "../../services/api/endpoints/groups";
import { AuthContext } from "../../contexts/AuthContext";

import styles from "./styles";


type GroupDetailsRouteProp = RouteProp<RootStackParamList, "GroupDetails">;
type GroupDetailsNavigationProp = StackNavigationProp<RootStackParamList, "GroupDetails">

function GroupDetails() {
    const navigation = useNavigation<GroupDetailsNavigationProp>();
    const route = useRoute<GroupDetailsRouteProp>();
    const { title, groupId } = route.params;

    const [players, setPlayers] = useState<PlayerInfo[]>([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

    const { token, isLoadingAuth } = useContext(AuthContext); 

    const fetchPlayers = useCallback(async () => {
            if (!token || isLoadingAuth) {
                console.warn("GROUP DETAILS SCREEN: Token não disponível ou autenticação em andamento para carregar jogadores.");
                setLoadingPlayers(false);
                return;
            }
    
            setLoadingPlayers(true);
            setSelectedPlayer(null);
            try {
                const data = await getPlayersByGroup(groupId);
                setPlayers(data);
            } catch (error) {
                console.error("PLAYERS SCREEN: Erro ao carregar jogadores:", error);
                Alert.alert("Erro", "Erro ao carregar a lista de jogadores.");
            } finally {
                setLoadingPlayers(false);
            }
        }, [token, isLoadingAuth, groupId]);
    
    useEffect(() => {
        fetchPlayers();
    }, [fetchPlayers]);
    
    const handlePlayerLongPress = (playerId: number) => {
        setSelectedPlayer(prev => (prev === playerId ? null : playerId));
    };

    const handleNewPlayersRegistered = () => {
        fetchPlayers();
    };

    const handleRemove = () => {
        if (!selectedPlayer) return;
        // API remove player logic
        // após remover, limpar seleção
        setSelectedPlayer(null);
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
        source={require("../../../assets/images/group-details-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.buttonsRow}>
                    <View style={{flex: 1}}>
                        <CustomButton title="Adicionar Jogadores"
                            onPress={()=> setModalVisible(true)}
                            fontSize={14} paddingHorizontal={20} paddingVertical={30} 
                            backgroundColor="#03045E" pressedBackgroundColor="#0077B6"/>
                    </View>
                    <View style={{flex: 1}}>
                        <CustomButton title="Remover Jogador" onPress={handleRemove}
                            fontSize={14} paddingHorizontal={20} paddingVertical={30} 
                            backgroundColor="#03045E" pressedBackgroundColor="#0077B6"
                            disabled={!selectedPlayer} />
                    </View>
                </View>
                <ListPlayerCard title="Jogadores" players={players}
                    pressable={true} selectedId={selectedPlayer}
                    onLongPress={handlePlayerLongPress} />
                <CustomButton title="Ir para Sorteio" onPress={()=>navigation.navigate("Draw")}
                    fontSize={16} paddingHorizontal={100} paddingVertical={25} 
                    backgroundColor="#03045E" pressedBackgroundColor="#0077B6" />
            </View>
            <AddPlayersModal visible={modalVisible} onClose={()=> setModalVisible(false)}
                groupId={groupId} onPlayersRegistered={handleNewPlayersRegistered}/>
        </View>
    </ImageBackground>
    );
}

export default GroupDetails;