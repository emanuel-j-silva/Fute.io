import React, {useState} from "react";
import {Text, View, ImageBackground} from "react-native";
import ListPlayerCard from "../../components/ListPlayerCard";
import CustomButton from "../../components/CustomButton";
import AddPlayersModal from "./components/AddPlayersModal";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigation";
import styles from "./styles";
import { mockPlayers } from "../../data/mockPlayers";

type GroupDetailsRouteProp = RouteProp<RootStackParamList, "GroupDetails">;
type GroupDetailsNavigationProp = StackNavigationProp<RootStackParamList, "GroupDetails">

function GroupDetails() {
    const navigation = useNavigation<GroupDetailsNavigationProp>();
    const route = useRoute<GroupDetailsRouteProp>();
    const { title } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
    
    const handlePlayerLongPress = (name: string) => {
        setSelectedPlayer(prev => (prev === name ? null : name));
    };

    const handleRemove = () => {
        if (!selectedPlayer) return;
        // API remove player logic
        // após remover, limpar seleção
        setSelectedPlayer(null);
    };

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
                <ListPlayerCard title="Jogadores" players={mockPlayers}
                    pressable={true} selectedName={selectedPlayer}
                    onLongPress={handlePlayerLongPress} />
                <CustomButton title="Ir para Sorteio" onPress={()=>navigation.navigate("Draw")}
                    fontSize={16} paddingHorizontal={100} paddingVertical={25} 
                    backgroundColor="#03045E" pressedBackgroundColor="#0077B6" />
            </View>
            <AddPlayersModal visible={modalVisible} onClose={()=> setModalVisible(false)}/>
        </View>
    </ImageBackground>
    );
}

export default GroupDetails;