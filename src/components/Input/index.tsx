import React from "react";
import {TextInput, TextInputProps, View} from "react-native"
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons"

interface InputProps extends TextInputProps{
    icon?:string;
    placeholder?:string;
    defaultColor?:string;
    size?:number;
    type?: "default" | "email" | "password" | "numeric" | "url";
}

function Input({icon, defaultColor = "#252534", placeholder, size=16, type="default", ...rest}: InputProps){
    return(
        <View style={styles.container}>
            {icon && (<MaterialIcons 
                style={styles.icon}
                name={icon as keyof typeof MaterialIcons.glyphMap || "help-outline"}
                size={size}
                color={defaultColor}
            />)}
            <TextInput style={[styles.textInput, {color: defaultColor}]} 
                placeholder={placeholder}
                cursorColor={defaultColor}
                placeholderTextColor={defaultColor}
                keyboardType={type === "email" ? "email-address" : type === "numeric" ? "numeric" : type === "url" ? "url" : "default"}
                secureTextEntry={type === "password"}
                autoCapitalize={type === "email" ? "none" : "sentences"}
                autoCorrect={type !== "email"}
                {...rest}
            />
        </View>
    );
}

export default Input;
