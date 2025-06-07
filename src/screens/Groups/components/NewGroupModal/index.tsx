import React, { useState } from "react";
import {Text, View, Modal, Pressable, ScrollView, Alert} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Input from "../../../../components/Input";
import CustomButton from "../../../../components/CustomButton";

import { registerGroup } from "../../../../services/api/endpoints/groups";

import styles from "./styles";

interface NewGroupModalProps{
    visible: boolean;
    onClose: ()=> void;
    onGroupRegistered: ()=> void;

}

function NewGroupModal({visible, onClose, onGroupRegistered}: NewGroupModalProps) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const HandleRegister = async () => {

        if (!name.trim() || !location.trim()) {
            Alert.alert("Erro", "Nome e Localização não podem estar vazios.");
            return;
        }

        const response = await registerGroup({name,location});

        Alert.alert(
            response.isError ? "Erro no Cadastro" : "Sucesso",
            response.message,
            [{ text: "OK", onPress: () => { 
                if (!response.isError){
                    onClose();
                    onGroupRegistered();

                    setName('');
                    setLocation('');
                }  
            } 
        }]);
    }

    return(
        <Modal visible={visible} animationType="fade"
                onRequestClose={onClose} transparent={true}>
            <View style={styles.container}>
                <Pressable onPress={onClose}>
                    <Icon name="close-circle" size={28} color="red" style={styles.closeIcon} />
                </Pressable>
                <Text style={styles.title}>Fute.io</Text>
                <Text style={styles.subtitle}>Novo Grupo</Text>
                <ScrollView style={styles.scroll}>

                    <View style={styles.divider}/>
                    <Input icon="account-group-outline" placeholder="Nome" defaultColor="#023e8a"
                    onChangeText={setName} value={name} /> 

                    <View style={styles.divider}/>
                    <Input icon="map-marker-outline" placeholder="Local" defaultColor="#023e8a"
                    onChangeText={setLocation} value={location} />         

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

export default NewGroupModal;