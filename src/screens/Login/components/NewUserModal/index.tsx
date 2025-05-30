import React, {useState} from "react";
import {Text, View, Modal, ScrollView, Pressable, Alert} from "react-native"
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import Input from "../../../../components/Input";
import CustomButton from "../../../../components/CustomButton";

import { registerAccount } from "../../../../services/api/auth";

import styles from "./styles";


interface NewUserModalProps{
    visible: boolean;
    onClose: ()=> void;
}

function NewUserModal({visible, onClose}: NewUserModalProps) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const HandleRegister = async () => {
        const response = await registerAccount({
            name,
            username,
            email,
            password,
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
                <Text style={styles.subtitle}>Criar Conta</Text>
                <ScrollView style={styles.scroll}>
                    <View style={styles.divider}/>
                    <Input icon="card-account-details-outline" placeholder="Nome" defaultColor="#023e8a"
                        value={name} onChangeText={setName} /> 
                    <View style={styles.divider}/>
                    <Input icon="account-circle" placeholder="Username" defaultColor="#023e8a"
                        value={username} onChangeText={setUsername} />            
                    <View style={styles.divider}/>
                    <Input icon="email" placeholder="Email" defaultColor="#023e8a" type="email"
                        value={email} onChangeText={setEmail} />            
                    <View style={styles.divider}/>
                    <Input icon="lock" placeholder="Senha" defaultColor="#023e8a" type="password"
                        value={password} onChangeText={setPassword} />
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <CustomButton title="Cadastrar" onPress={HandleRegister} 
                        pressedBackgroundColor="#48cae490"/>
                </View>
            </View>
        </Modal>
    );
}

export default NewUserModal;