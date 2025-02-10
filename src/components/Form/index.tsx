import React from "react";
import {View, Text} from "react-native"
import Input from "../Input";
import CustomButton from "../CustomButton";
import styles from "./styles";

function Form(){
    return(
        <View style={styles.container}>
            <Input icon="email" placeholder="Email" defaultColor="#252534"/>            
            <Input icon="password" placeholder="Senha" defaultColor="#252534"/>
            <CustomButton title="Login" onPress={onPress}/>
            <Text style={styles.text}>Criar conta</Text>
        </View>
    )   
}

function onPress(){

}

export default Form;