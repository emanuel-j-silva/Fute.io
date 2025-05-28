import React, { useState } from "react";
import {Text, View, ImageBackground, ScrollView} from "react-native"
import CustomButton from "../../components/CustomButton";
import ListPlayerCard from "../../components/ListPlayerCard";

import styles from "./styles";
import NewPlayerModal from "./components/NewPlayerModal";

function Players() {
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
            <ListPlayerCard title="Todos os Jogadores" pressable={true} selectedName={selectedPlayer}
                onLongPress={handlePlayerLongPress}/>
            <NewPlayerModal visible={modalVisible} onClose={()=> setModalVisible(false)}/>
        </View>
    </ImageBackground>
    );
}

export default Players;