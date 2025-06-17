import React, { useState, useContext, useEffect, useCallback } from "react";
import {Text, View, ImageBackground, ScrollView, ActivityIndicator, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../../components/CustomButton";
import GroupCard from "./components/GroupCard";
import NewGroupModal from "./components/NewGroupModal";

import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigation";

import { getGroups, deleteGroup } from "../../services/api/endpoints/groups";
import { GroupInfo } from "../../../types/group";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./styles";
import { RegisterResponse } from "../../../types/register";

type GroupsNavigationProp = StackNavigationProp<RootStackParamList, "Groups">

function Groups() {
    const [groups, setGroups] = useState<GroupInfo[]>([]);
    const navigation = useNavigation<GroupsNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [loadingGroups, setLoadingGroups] = useState(true);
    const [isDeletingGroup, setIsDeletingGroup] = useState(false);
    

    const { token, isLoadingAuth } = useContext(AuthContext); 

    const handleCardPress = (groupName: string, groupId: string) => {
        navigation.navigate("GroupDetails", { title: groupName, groupId: groupId });
    };
    
    const handleCardLongPress = (groupId: string) => {
        setSelectedGroup(prev => (prev === groupId ? null : groupId));
    };

    const fetchGroups= useCallback(async () => {
            if (!token || isLoadingAuth) {
                console.warn("GROUPS SCREEN: Token não disponível ou autenticação em andamento para carregar jogadores.");
                setLoadingGroups(false);
                return;
            }
    
            setLoadingGroups(true);
            setSelectedGroup(null);
            try {
                const data = await getGroups();
                setGroups(data);
            } catch (error) {
                console.error("GROUPS SCREEN: Erro ao carregar jogadores:", error);
                Alert.alert("Erro", "Erro ao carregar a lista de jogadores.");
            } finally {
                setLoadingGroups(false);
            }
        }, [token, isLoadingAuth]);
    
        useEffect(() => {
            fetchGroups();
        }, [fetchGroups]);
    
    const handleNewGroupRegistered = () => {
        fetchGroups();
    };

    const handleRemove = async () => {
        if (!selectedGroup || isDeletingGroup) {
            return;
        }
        
        Alert.alert(
            "Confirmar Deleção",
            `Tem certeza que deseja excluir o grupo selecionado?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                    onPress: () => setSelectedGroup(null)
                },
                {
                    text: "Deletar",
                    onPress: async () => {
                    setIsDeletingGroup(true);

                    try {
                        const result: RegisterResponse = await deleteGroup(selectedGroup);
                                    
                        if (result.isError) {
                            Alert.alert("Erro ao Remover", result.message);
                        } else {
                            Alert.alert("Sucesso", result.message || "Jogador deletado com sucesso!");
                            setSelectedGroup(null);
                            fetchGroups();
                        }
                    } catch (error) {
                        console.error("PLAYERS SCREEN: Erro inesperado ao deletar jogador:", error);
                        Alert.alert("Erro", "Ocorreu um erro inesperado ao deletar o jogador.");
                    } finally {
                        setIsDeletingGroup(false);
                    }
                },
                style: "destructive"
            },
        ],
        { cancelable: true, onDismiss: () => setSelectedGroup(null) }
        );
    };

    if (isLoadingAuth || loadingGroups) {
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
        source={require("../../../assets/images/groups-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <Text style={styles.title}>Grupos</Text>
            <View style={styles.buttonsRow}>
                <View style={{flex: 1}}>
                    <CustomButton title="Novo Grupo" onPress={()=> setModalVisible(true)} 
                    fontSize={12} backgroundColor="#03045E" pressedBackgroundColor="#0077B6"
                        paddingHorizontal={30} paddingVertical={30} />
                </View>
                <View style={{flex: 1}}>
                    <CustomButton title="Remover Grupo" onPress={handleRemove} 
                    disabled={!selectedGroup}
                    fontSize={12} backgroundColor="#03045E" pressedBackgroundColor="#ED2929"
                    paddingHorizontal={30} paddingVertical={30}/>
                </View>
            </View>
            <ScrollView>
                {groups.length > 0 ? (
                groups.map((group) =>(
                    <GroupCard key={group.id} 
                        name={group.name} numPlayers={group.numberOfPlayers} 
                        location={group.location} 
                        selected={selectedGroup === group.id}
                        onPress={()=> handleCardPress(group.name, group.id)}
                        onLongPress={()=> handleCardLongPress(group.id)}/>
                ))) :
                (<Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>Nenhum grupo encontrado.</Text>)
                }
            </ScrollView>

            <NewGroupModal visible={modalVisible} onClose={()=> setModalVisible(false)}
                onGroupRegistered={handleNewGroupRegistered} />
        </View>
    </ImageBackground>
    );
}

export default Groups;