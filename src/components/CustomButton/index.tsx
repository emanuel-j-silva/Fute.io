import React from "react";
import { Pressable, Text } from 'react-native';
import styles from "./styles";

interface CustomButtonProps{
    title: string;
    onPress: () => void;
    disabled?: boolean;
    backgroundColor?: string;
    pressedBackgroundColor?: string;
    textColor?: string;
    fontSize?: number;
    fontFamily?: string;
    paddingHorizontal?:number;
    paddingVertical?:number;
}

function CustomButton({title, onPress,
    disabled = false, 
    backgroundColor = "#050517", 
    pressedBackgroundColor, 
    textColor = "white",
    fontSize = 16,
    fontFamily = "System",
    paddingHorizontal = 100,
    paddingVertical = 22
}: CustomButtonProps){
    return(
        <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => {
        const base = [
          styles.button,
          { paddingHorizontal, paddingVertical, backgroundColor: pressed
              ? pressedBackgroundColor ?? backgroundColor
              : backgroundColor, },
        ];
        if (disabled) {
          return [...base, { opacity: 0.5 }];
        }
        return [
          ...base
        ];
      }}
    >
            <Text style={[styles.text, { color: textColor, fontSize, fontFamily }]}>
                {title}
            </Text>
        </Pressable>
    );
}

export default CustomButton;