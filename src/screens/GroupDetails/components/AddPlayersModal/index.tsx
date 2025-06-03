import React, {useState} from "react";
import {Text, View, Modal, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListPlayerCard from "../../../../components/ListPlayerCard";
import CustomButton from "../../../../components/CustomButton";
import styles from "./styles";
import { mockPlayers } from "../../../../data/mockPlayers";

interface AddPlayersProps{
    visible: boolean;
    onClose: ()=> void;
}

function AddPlayersModal({visible, onClose}: AddPlayersProps) {
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

    const togglePlayer = (name: string) => {
        setSelectedPlayers(prev =>
            prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
        );
    };

    return(
        <Modal visible={visible} animationType="fade"
                onRequestClose={onClose} transparent={true}>
            <View style={styles.container}>
                <Pressable onPress={onClose}>
                    <Icon name="close-circle" size={28} color="red" style={styles.closeIcon} />
                </Pressable>
                <Text style={styles.title}>Fute.io</Text>
                <Text style={styles.subtitle}>Selecione os jogadores que deseja incluir neste grupo</Text>
                <ListPlayerCard title="Adicionar Jogadores" players={mockPlayers}
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