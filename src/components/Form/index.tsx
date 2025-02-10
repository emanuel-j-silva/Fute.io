import React from "react";
import {View, Text} from "react-native"
import Input from "../Input";
import CustomButton from "../CustomButton";
import styles from "./styles";

function Form(){
    return(
        <View style={styles.container}>
            <Input icon="email" placeholder="Email" defaultColor="#023e8a" type="email"/>            
            <Input icon="lock" placeholder="Senha" defaultColor="#023e8a" type="password"/>
            <CustomButton title="Login" onPress={onPress} pressedBackgroundColor="#48cae490"/> 
            <Text style={styles.text}>Criar conta</Text>
        </View>
    )   
}

function onPress(){}

export default Form;