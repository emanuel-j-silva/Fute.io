import React from "react";
import {View, Text} from "react-native"
import { StackNavigationProp } from '@react-navigation/stack';
import Input from "../Input";
import CustomButton from "../CustomButton";
import styles from "./styles";

type StackParamList = {
    Login: undefined;
    MainTabs: undefined;
  };
  
  type FormProps = {
    navigation: StackNavigationProp<StackParamList, "Login">;
  };

function Form({navigation}: FormProps){
    return(
        <View style={styles.container}>
            <Input icon="email" placeholder="Email" defaultColor="#023e8a" type="email"/>            
            <Input icon="lock" placeholder="Senha" defaultColor="#023e8a" type="password"/>
            <CustomButton title="Login" onPress={() => navigation.replace("MainTabs")} pressedBackgroundColor="#48cae490"/> 
            <Text style={styles.text}>Criar conta</Text>
        </View>
    )   
}

export default Form;