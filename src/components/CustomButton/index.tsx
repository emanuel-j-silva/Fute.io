import React from "react";
import { GestureResponderEvent, Pressable, Text } from 'react-native';
import styles from "./styles";

interface CustomButtonProps{
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    backgroundColor?: string;
    pressedBackgroundColor?: string;
    textColor?: string;
    fontSize?: number;
    fontFamily?: string;
    paddingHorizontal?:number;
    paddingVertical?:number;
}

function CustomButton({title, onPress, 
    backgroundColor = "#050517", 
    pressedBackgroundColor, 
    textColor = "white",
    fontSize = 16,
    fontFamily = "System",
    paddingHorizontal = 100,
    paddingVertical = 22
}: CustomButtonProps){
    return(
        <Pressable style={({ pressed }) => [
            styles.button,
            {backgroundColor: pressed ? pressedBackgroundColor : backgroundColor},
            {paddingHorizontal: paddingHorizontal},
            {paddingVertical: paddingVertical}
          ]}
          onPress={onPress}
        >
            <Text style={[styles.text, {color: textColor, fontSize, fontFamily}]}>
                {title}
            </Text>
        </Pressable>
    );
}

export default CustomButton;