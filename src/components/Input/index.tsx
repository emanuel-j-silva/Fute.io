import React from "react";
import {TextInput, TextInputProps, View} from "react-native"
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons"

interface InputProps extends TextInputProps{
    icon?:string
    placeholder?:string
    size?:number
}

function Input({icon, placeholder,size, ...rest}: InputProps){
    return(
        <View style={styles.container}>
            {icon && <MaterialIcons 
                name={icon as keyof typeof MaterialIcons.glyphMap || "help-outline"}
                size={size}
            />}
            <TextInput placeholder={placeholder}/>
        </View>
    );
}

export default Input;
