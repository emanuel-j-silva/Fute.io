import React from "react";
import { GestureResponderEvent, Pressable, Text } from 'react-native';
import styles from "./styles";

interface CustomButtonProps{
    title: string;
    onPress: (event: GestureResponderEvent) => void;

}

function CustomButton({title, onPress}: CustomButtonProps){
    return(
        <Pressable style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

export default CustomButton;