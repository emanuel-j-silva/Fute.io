import React, {useRef, useEffect} from "react";
import {Text, View, Pressable, Animated, ViewStyle } from "react-native"
import ProfilePicture from "../ProfilePicture";
import styles from "./styles";

interface PlayerCardProps{
    name: string;
    overall: number;
    photoUrl?: string;
    photoSize?: number;
    nameColor?: string;
    backColor?: string;
    isPressable?: boolean;
    selected?: boolean;
    onLongPress?: ()=> void;
}

function PlayerCard({ name, overall, photoUrl, photoSize, 
    nameColor = "#FFFFFF", backColor = "#050517", 
    isPressable = false, selected= false, onLongPress}: PlayerCardProps) {

    const colorStyle: string = overall >= 90 ? "#006600" : overall >= 80 ? "#21DA49" : 
    overall >= 60 ? "#C3BF2E" : overall >= 40 ? "#ED8529" : "#ED2929";

    const scale = useRef(new Animated.Value(1)).current;
    
        useEffect(() => {
        Animated.spring(scale, {
          toValue: selected ? 1.05 : 1,
          useNativeDriver: true,
        }).start();
        }, [selected, scale]);
    
        const animatedStyle: ViewStyle = {
        transform: [{ scale }],
        };

        const content = (
            <Animated.View style={[styles.container, { backgroundColor: backColor }, animatedStyle]}>
                <ProfilePicture photoUrl={photoUrl} size={photoSize} />
                <Text style={[styles.name, { color: nameColor }]}>{name}</Text>
                <Text style={[styles.overall, { color: colorStyle }]}>{overall}</Text>
            </Animated.View>
        );

    return isPressable ? (<Pressable onLongPress={onLongPress}>{content}</Pressable>) : 
        (<View>{content}</View>);
}


export default PlayerCard;