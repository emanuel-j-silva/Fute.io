import React from "react";
import {Text, View, Modal, Pressable, ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Input from "../../../../components/Input";
import CustomButton from "../../../../components/CustomButton";
import styles from "./styles";

interface NewPlayerModalProps{
    visible: boolean;
    onClose: ()=> void;
}

function NewPlayerModal({visible, onClose}: NewPlayerModalProps) {
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
                    <Input icon="account-box" placeholder="Nome" defaultColor="#023e8a"/> 
                    <View style={styles.divider}/>
                    <Input icon="star-shooting" placeholder="Overall" defaultColor="#023e8a"/>            
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <CustomButton title="Cadastrar" onPress={()=>{}} 
                        backgroundColor="#050517" textColor="#D9D9D9"
                        pressedBackgroundColor="#48cae490"/>
                </View>
            </View>
        </Modal>
    );
}

export default NewPlayerModal;