import React, {useState} from "react";
import {Text, View, Modal, Pressable, ScrollView, Alert} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Input from "../../../../components/Input";
import CustomButton from "../../../../components/CustomButton";

import { registerPlayer } from "../../../../services/api/endpoints/players";

import styles from "./styles";

interface NewPlayerModalProps{
    visible: boolean;
    onClose: ()=> void;
}

function NewPlayerModal({visible, onClose}: NewPlayerModalProps) {
    const [name, setName] = useState('');
    const [overall, setOverall] = useState('');

    const HandleRegister = async () => {
            const response = await registerPlayer({
                name,
                overall
            });
    
            Alert.alert(
                response.isError ? "Erro no Cadastro" : "Sucesso",
                response.message,
                [{ text: "OK", onPress: () => { if (!response.isError) onClose(); } }]
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
                <Text style={styles.subtitle}>Novo Jogador</Text>
                <ScrollView style={styles.scroll}>

                    <View style={styles.divider}/>
                    <Input icon="account-box" placeholder="Nome" defaultColor="#023e8a"
                     onChangeText={setName}/> 

                    <View style={styles.divider}/>
                    <Input icon="star-shooting" placeholder="Overall" defaultColor="#023e8a"
                    onChangeText={setOverall}/>            

                </ScrollView>
                <View style={styles.buttonContainer}>
                    <CustomButton title="Cadastrar" onPress={HandleRegister} 
                        backgroundColor="#050517" textColor="#D9D9D9"
                        pressedBackgroundColor="#48cae490"/>
                </View>
            </View>
        </Modal>
    );
}

export default NewPlayerModal;