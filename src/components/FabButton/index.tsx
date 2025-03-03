import React from "react";
import {Pressable, GestureResponderEvent, View} from "react-native"
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FabButtonProps{
    icon?: string;
    iconColor?: string;
    backColor?: string;
    onPress?: (event: GestureResponderEvent) => void;
}

function FabButton({icon = "plus", iconColor = "#D9D9D9", backColor = "#000000", onPress}: FabButtonProps) {
    return(
    <View style={styles.container}>
        <Pressable onPress={onPress} style={[styles.button, {backgroundColor: backColor}]}>
            <Icon name={icon} size={24} color={iconColor}/>
        </Pressable>
    </View> 
    );
}

export default FabButton;