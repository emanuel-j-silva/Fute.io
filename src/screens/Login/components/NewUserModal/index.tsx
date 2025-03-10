import React from "react";
import {Text, View, Modal, ScrollView, Pressable} from "react-native"
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import Input from "../../../../components/Input";
import CustomButton from "../../../../components/CustomButton";

interface NewUserModalProps{
    visible: boolean;
    onClose: ()=> void;
}

function NewUserModal({visible, onClose}: NewUserModalProps) {
    return(
        <Modal visible={visible} animationType="fade"
                onRequestClose={onClose} transparent={true}>
            <View style={styles.container}>
                <Pressable onPress={onClose}>
                    <Icon name="close-circle" size={28} color="red" style={styles.closeIcon} />
                </Pressable>
                <Text style={styles.title}>Fute.io</Text>
                <Text style={styles.subtitle}>Criar Conta</Text>
                <ScrollView style={styles.scroll}>
                    <View style={styles.divider}/>
                    <Input icon="card-account-details-outline" placeholder="Nome" defaultColor="#023e8a"/> 
                    <View style={styles.divider}/>
                    <Input icon="account-circle" placeholder="Username" defaultColor="#023e8a"/>            
                    <View style={styles.divider}/>
                    <Input icon="email" placeholder="Email" defaultColor="#023e8a" type="email"/>            
                    <View style={styles.divider}/>
                    <Input icon="lock" placeholder="Senha" defaultColor="#023e8a" type="password"/>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <CustomButton title="Cadastrar" onPress={()=>{}} 
                        pressedBackgroundColor="#48cae490"/>
                </View>
            </View>
        </Modal>
    );
}

export default NewUserModal;