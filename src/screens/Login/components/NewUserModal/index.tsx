import React, {useState} from "react";
import {Text, View, Modal, ScrollView, Pressable} from "react-native"
import styles from "./styles";

interface NewUserModalProps{
    visible: boolean;
    onClose: ()=> void;
}

function NewUserModal({visible, onClose}: NewUserModalProps) {
    return(
        <Modal visible={visible} animationType="fade"
                onRequestClose={onClose} transparent={true}>
            <View style={styles.container}>
                <Text style={styles.title}>Fute.io</Text>
                <Pressable onPress={onClose}>
                    <Text>Fechar</Text>
                </Pressable>
            </View>
        </Modal>
    );
}

export default NewUserModal;