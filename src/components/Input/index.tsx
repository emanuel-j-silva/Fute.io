import React from "react";
import {TextInput, TextInputProps, View} from "react-native"
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons"

interface InputProps extends TextInputProps{
    icon?:string
    placeholder?:string
    defaultColor?:string
    size?:number
}

function Input({icon, placeholder, defaultColor, size, ...rest}: InputProps){
    return(
        <View style={styles.container}>
            {icon && <MaterialIcons 
                style={styles.icon}
                name={icon as keyof typeof MaterialIcons.glyphMap || "help-outline"}
                size={size}
                color={defaultColor}
            />}
            <TextInput style={styles.textInput} placeholder={placeholder}
                placeholderTextColor={defaultColor}
                {...rest}
            />
        </View>
    );
}

export default Input;
